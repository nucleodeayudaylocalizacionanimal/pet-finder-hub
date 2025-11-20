import { mockPets } from '@/data/mocks';
import PetCard from '@/components/PetCard';
import { MapPin } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Mascotas Cerca de Ti</h2>
      
      {/* Map Simulator */}
      <div className="mb-8 relative h-64 bg-muted rounded-xl overflow-hidden border border-border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Radius Circle */}
            <div className="absolute w-48 h-48 rounded-full border-4 border-primary/30 animate-pulse" 
                 style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            {/* Center Pin */}
            <div className="relative z-10 w-12 h-12 bg-destructive rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-7 h-7 text-destructive-foreground" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm font-medium text-card-foreground">📍 Tu ubicación: Roma Norte, CDMX</p>
        </div>
      </div>

      {/* Pet Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
