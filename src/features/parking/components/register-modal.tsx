import { useState } from 'react';
import { Plus, Car, Bike, CheckCircle2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useParkiStore } from '@/stores/use-parki-store';
import { cn, type VehicleType } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function RegisterModal() {
  const [open, setOpen] = useState(false);
  const [plate, setPlate] = useState('');
  const [type, setType] = useState<VehicleType>('car');
  const [error, setError] = useState('');
  const addVehicle = useParkiStore((state) => state.addVehicle);

  const validatePlate = (val: string) => {
    // Regex simple para placas (ej: ABC-123 o ABC123)
    const regex = /^[A-Z]{3}-?\d{3}$/i;
    if (!val) return 'La placa es requerida';
    if (!regex.test(val)) return 'Formato inválido (ej: ABC-123)';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePlate(plate);
    if (err) {
      setError(err);
      return;
    }
    
    addVehicle({
      plate: plate.toUpperCase(),
      type,
    });
    
    setPlate('');
    setType('car');
    setError('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-8 right-8 z-[100] group">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500 animate-pulse"></div>
          <Button className="relative h-14 w-14 rounded-full shadow-[0_0_40px_-10px_hsl(var(--primary)/0.8)] hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/1)] hover:-translate-y-1 active:scale-95 transition-all duration-300 bg-primary bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground border-none ring-1 ring-white/30 p-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Plus className="h-7 w-7 relative z-10 drop-shadow-md" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30 border border-white/10 shadow-[0_0_80px_-15px_hsl(var(--primary)/0.3)] overflow-hidden p-0 rounded-[2.5rem]">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
        
        <DialogHeader className="p-8 pb-4 relative">
          <DialogTitle className="text-3xl font-bold tracking-tight text-gradient relative z-10">Registro</DialogTitle>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 relative z-10">Ingreso Vehicular</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-8">
          <div className="space-y-3">
            <Label htmlFor="plate" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 ml-1">
              Placa del Vehículo
            </Label>
            <div className="relative group">
              <Input
                id="plate"
                value={plate}
                onChange={(e) => {
                  setPlate(e.target.value);
                  setError('');
                }}
                placeholder="ABC-123"
                className={cn(
                  "h-14 text-2xl font-bold uppercase tracking-[0.2em] bg-white/5 border-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all rounded-2xl text-center",
                  error 
                    ? "ring-destructive/40 focus-visible:ring-destructive" 
                    : "ring-white/10"
                )}
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 left-1 text-[9px] font-bold text-destructive uppercase tracking-wide"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 ml-1">
              Tipo de Vehículo
            </Label>
            <RadioGroup 
              value={type} 
              onValueChange={(val) => setType(val as VehicleType)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="car" id="car" className="peer sr-only" />
                <Label
                  htmlFor="car"
                  className={cn(
                    "flex flex-col items-center justify-center p-5 rounded-[2rem] cursor-pointer transition-all border-none ring-1",
                    type === 'car' 
                      ? "ring-primary/40 bg-primary/10 shadow-[inner_0_0_20px_rgba(var(--primary),0.05)]" 
                      : "ring-white/5 bg-white/5 hover:bg-white/10 hover:ring-white/10"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-xl mb-2 transition-colors",
                    type === 'car' ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"
                  )}>
                    <Car className="h-6 w-6" />
                  </div>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-[0.2em]",
                    type === 'car' ? "text-primary" : "text-muted-foreground"
                  )}>Carro</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="motorcycle" id="motorcycle" className="peer sr-only" />
                <Label
                  htmlFor="motorcycle"
                  className={cn(
                    "flex flex-col items-center justify-center p-5 rounded-[2rem] cursor-pointer transition-all border-none ring-1",
                    type === 'motorcycle' 
                      ? "ring-primary/40 bg-primary/10 shadow-[inner_0_0_20px_rgba(var(--primary),0.05)]" 
                      : "ring-white/5 bg-white/5 hover:bg-white/10 hover:ring-white/10"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-xl mb-2 transition-colors",
                    type === 'motorcycle' ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"
                  )}>
                    <Bike className="h-6 w-6" />
                  </div>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-[0.2em]",
                    type === 'motorcycle' ? "text-primary" : "text-muted-foreground"
                  )}>Moto</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full h-14 text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-all gap-3 bg-primary text-primary-foreground group/btn border-none">
            <CheckCircle2 className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            REGISTRAR
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
