import { AlertCircle, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
          <Heart className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm font-semibold text-primary">Reuniendo familias desde 2025</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Encuentra a tu
          <br />
          <span className="text-primary">mejor amigo</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Una red de apoyo comunitaria para localizar mascotas perdidas y reunirlas con sus familias.
          Rápido, seguro y efectivo.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="grid md:grid-cols-2 gap-4 mb-16">
        <Link to="/report" className="block">
          <Button
            size="lg"
            className="w-full h-auto py-6 px-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl transition-all"
          >
            <AlertCircle className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="text-lg font-bold">🚨 PERDÍ MI MASCOTA</div>
              <div className="text-sm opacity-90">Crea una alerta inmediata</div>
            </div>
          </Button>
        </Link>
        <Link to="/dashboard" className="block">
          <Button
            size="lg"
            className="w-full h-auto py-6 px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            <Eye className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="text-lg font-bold">👁️ VI UNA MASCOTA</div>
              <div className="text-sm opacity-90">Ayuda a reunir familias</div>
            </div>
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 rounded-xl bg-card border border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-bold text-card-foreground mb-2">Alertas Rápidas</h3>
          <p className="text-sm text-muted-foreground">
            Notifica a la comunidad en segundos cuando pierdes a tu mascota
          </p>
        </div>
        <div className="text-center p-6 rounded-xl bg-card border border-border">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="font-bold text-card-foreground mb-2">Red Comunitaria</h3>
          <p className="text-sm text-muted-foreground">
            Miles de ojos ayudando a buscar mascotas en tu zona
          </p>
        </div>
        <div className="text-center p-6 rounded-xl bg-card border border-border">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-bold text-card-foreground mb-2">100% Seguro</h3>
          <p className="text-sm text-muted-foreground">
            Sistema anti-estafa y verificación de usuarios
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-3xl font-bold text-primary">1,247</div>
          <div className="text-sm text-muted-foreground">Mascotas reunidas</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-secondary">3,856</div>
          <div className="text-sm text-muted-foreground">Usuarios activos</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-accent">98%</div>
          <div className="text-sm text-muted-foreground">Tasa de éxito</div>
        </div>
      </div>
    </div>
  );
}
