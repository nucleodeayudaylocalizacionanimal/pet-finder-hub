import { MapPin, Award } from 'lucide-react';
import { Pet } from '@/data/mocks';
import { getDistance } from '@/data/mocks';

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  const statusColors = {
    lost: 'bg-destructive text-destructive-foreground',
    found: 'bg-secondary text-secondary-foreground',
    safe: 'bg-success text-success-foreground'
  };

  const statusLabels = {
    lost: 'PERDIDO',
    found: 'ENCONTRADO',
    safe: 'REUNIDO'
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border">
      <div className="relative">
        <img
          src={pet.photoUrl}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${statusColors[pet.status]}`}>
          {statusLabels[pet.status]}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-card-foreground">{pet.name}</h3>
            {pet.breed && <p className="text-sm text-muted-foreground">{pet.breed}</p>}
          </div>
          {pet.reward && (
            <div className="flex items-center gap-1 text-primary">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">${pet.reward}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-card-foreground line-clamp-2 mb-3">{pet.description}</p>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span className="flex-1 truncate">{pet.location.address}</span>
          <span className="font-medium text-primary">
            {getDistance(pet.location.lat, pet.location.lng)}
          </span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {new Date(pet.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
        </div>
      </div>
    </div>
  );
}
