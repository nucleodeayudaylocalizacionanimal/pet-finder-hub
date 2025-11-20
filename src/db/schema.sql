-- Project N.A.L.A. Database Schema
-- PostgreSQL with PostGIS extension for geolocation

-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  trust_score INTEGER DEFAULT 50 CHECK (trust_score >= 0 AND trust_score <= 100),
  is_verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pets table with geolocation
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255),
  status VARCHAR(20) NOT NULL CHECK (status IN ('lost', 'found', 'safe')),
  description TEXT,
  photo_url TEXT NOT NULL,
  reward DECIMAL(10, 2),
  location GEOGRAPHY(POINT, 4326) NOT NULL, -- PostGIS geography type
  location_address TEXT,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_reported DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spatial index for efficient geolocation queries
CREATE INDEX idx_pets_location ON pets USING GIST(location);

-- Messages table for chat
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_owner ON pets(owner_id);
CREATE INDEX idx_messages_pet ON messages(pet_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);

-- Function to calculate distance between two points (in kilometers)
-- Usage: SELECT calculate_distance(lat1, lng1, lat2, lng2);
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DOUBLE PRECISION,
  lng1 DOUBLE PRECISION,
  lat2 DOUBLE PRECISION,
  lng2 DOUBLE PRECISION
) RETURNS DOUBLE PRECISION AS $$
BEGIN
  RETURN ST_Distance(
    ST_MakePoint(lng1, lat1)::geography,
    ST_MakePoint(lng2, lat2)::geography
  ) / 1000; -- Convert meters to kilometers
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- View for nearby pets query
-- Finds pets within a radius (default 10km)
CREATE OR REPLACE FUNCTION nearby_pets(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 10
) RETURNS TABLE (
  id UUID,
  name VARCHAR,
  status VARCHAR,
  distance_km DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.status,
    ST_Distance(
      p.location,
      ST_MakePoint(user_lng, user_lat)::geography
    ) / 1000 AS distance_km
  FROM pets p
  WHERE ST_DWithin(
    p.location,
    ST_MakePoint(user_lng, user_lat)::geography,
    radius_km * 1000
  )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;
