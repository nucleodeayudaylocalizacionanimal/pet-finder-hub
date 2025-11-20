export interface User {
  id: string;
  name: string;
  trustScore: number;
  isVerified: boolean;
  avatar?: string;
}

export interface Pet {
  id: string;
  name: string;
  status: 'lost' | 'found' | 'safe';
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  photoUrl: string;
  description: string;
  reward?: number;
  ownerId: string;
  date: string;
  breed?: string;
}

export const mockUsers: User[] = [
  {
    id: 'user-01',
    name: 'María González',
    trustScore: 95,
    isVerified: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  },
  {
    id: 'user-02',
    name: 'Carlos Ramírez',
    trustScore: 88,
    isVerified: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
  },
  {
    id: 'user-03',
    name: 'Ana Martínez',
    trustScore: 72,
    isVerified: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
  }
];

export const mockPets: Pet[] = [
  {
    id: 'nala-01',
    name: 'Nala',
    status: 'lost',
    location: {
      lat: 19.4326,
      lng: -99.1332,
      address: 'Colonia Roma Norte, CDMX'
    },
    photoUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
    description: 'Rottweiler hembra, collar rojo con placa. Muy amigable pero asustada. Última vez vista cerca del parque.',
    reward: 2000,
    ownerId: 'user-01',
    date: '2025-11-19',
    breed: 'Rottweiler'
  },
  {
    id: 'pet-02',
    name: 'Max',
    status: 'found',
    location: {
      lat: 19.4285,
      lng: -99.1277,
      address: 'Colonia Condesa, CDMX'
    },
    photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    description: 'Golden Retriever encontrado sin collar. Está en buen estado, busca a su familia.',
    ownerId: 'user-02',
    date: '2025-11-18',
    breed: 'Golden Retriever'
  },
  {
    id: 'pet-03',
    name: 'Luna',
    status: 'lost',
    location: {
      lat: 19.4363,
      lng: -99.1415,
      address: 'Colonia Juárez, CDMX'
    },
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
    description: 'Gata blanca con manchas grises. Collar azul con campana. Muy asustadiza.',
    reward: 1000,
    ownerId: 'user-03',
    date: '2025-11-17',
    breed: 'Doméstico'
  },
  {
    id: 'pet-04',
    name: 'Rocky',
    status: 'safe',
    location: {
      lat: 19.4200,
      lng: -99.1500,
      address: 'Colonia Del Valle, CDMX'
    },
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    description: 'Husky siberiano. ¡Encontrado y reunido con su familia!',
    ownerId: 'user-01',
    date: '2025-11-16',
    breed: 'Husky Siberiano'
  },
  {
    id: 'pet-05',
    name: 'Bella',
    status: 'found',
    location: {
      lat: 19.4400,
      lng: -99.1300,
      address: 'Colonia Polanco, CDMX'
    },
    photoUrl: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=400',
    description: 'Chihuahua pequeña, muy dulce. Encontrada cerca de la plaza comercial.',
    ownerId: 'user-02',
    date: '2025-11-19',
    breed: 'Chihuahua'
  }
];

// Helper to get distance (simulated)
export const getDistance = (lat1: number, lng1: number): string => {
  const distance = Math.random() * 10;
  return distance < 1 ? '< 1 km' : `${distance.toFixed(1)} km`;
};
