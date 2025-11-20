import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera, MapPin, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type Step = 'photo' | 'details' | 'location' | 'success';

export default function Report() {
  const [step, setStep] = useState<Step>('photo');
  const [formData, setFormData] = useState({
    photo: '',
    name: '',
    breed: '',
    description: '',
    reward: '',
    location: ''
  });

  const handleNext = () => {
    if (step === 'photo' && !formData.photo) {
      toast.error('Por favor agrega una foto');
      return;
    }
    if (step === 'details' && !formData.name) {
      toast.error('Por favor ingresa el nombre');
      return;
    }
    if (step === 'location') {
      setStep('success');
      setTimeout(() => {
        alert('¡Alerta Generada! Tu mascota ha sido reportada a la comunidad.');
      }, 500);
      return;
    }
    const steps: Step[] = ['photo', 'details', 'location', 'success'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['photo', 'details', 'location'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="container px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Reportar Mascota</h2>
        <div className="flex gap-2 mt-4">
          {['photo', 'details', 'location'].map((s, i) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${
                ['photo', 'details', 'location'].indexOf(step) >= i
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 'photo' && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">Sube una foto de tu mascota</p>
            <p className="text-sm text-muted-foreground mb-4">
              Una imagen clara ayuda a identificarla mejor
            </p>
            <Input
              type="file"
              accept="image/*"
              className="max-w-xs mx-auto"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
                }
              }}
            />
          </div>
          {formData.photo && (
            <div className="rounded-xl overflow-hidden">
              <img src={formData.photo} alt="Preview" className="w-full h-64 object-cover" />
            </div>
          )}
        </div>
      )}

      {step === 'details' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre de la mascota *
            </label>
            <Input
              placeholder="Ej: Nala"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Raza</label>
            <Input
              placeholder="Ej: Rottweiler"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
            <Textarea
              placeholder="Detalles que ayuden a identificar a tu mascota..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Recompensa (opcional)
            </label>
            <Input
              type="number"
              placeholder="$0"
              value={formData.reward}
              onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
            />
          </div>
        </div>
      )}

      {step === 'location' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              ¿Dónde se perdió?
            </label>
            <Input
              placeholder="Dirección o zona"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div className="bg-muted rounded-xl p-6 border border-border">
            <MapPin className="w-8 h-8 text-primary mb-3" />
            <p className="text-foreground font-medium mb-2">Ubicación aproximada</p>
            <p className="text-sm text-muted-foreground">
              Tu ubicación actual ayudará a mostrar tu alerta a usuarios cercanos
            </p>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-12">
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-foreground mb-3">¡Alerta Creada!</h3>
          <p className="text-muted-foreground mb-8">
            Tu reporte ha sido enviado a la comunidad. Te notificaremos si alguien ve a tu mascota.
          </p>
          <Button onClick={() => (window.location.href = '/dashboard')} size="lg">
            Ver Mapa
          </Button>
        </div>
      )}

      {step !== 'success' && (
        <div className="flex gap-3 mt-8">
          {step !== 'photo' && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {step === 'location' ? 'Crear Alerta' : 'Siguiente'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
