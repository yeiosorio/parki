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
      <DialogContent className="sm:max-w-[360px] bg-background/30 backdrop-blur-[20px] supports-[backdrop-filter]:bg-background/20 border-none shadow-[0_0_80px_-20px_color-mix(in_oklch,var(--primary)_30%,transparent)] overflow-hidden p-0 rounded-2xl !ring-0">
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10" />
        
        <DialogHeader className="px-5 pt-5 pb-1">
          <DialogTitle className="text-xl font-bold tracking-tight text-gradient">Registro</DialogTitle>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Ingreso Vehicular</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-5 pb-5 pt-1 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="plate" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 ml-1">
              Placa del Vehículo
            </Label>
            <div className="relative">
              <Input
                id="plate"
                value={plate}
                onChange={(e) => {
                  setPlate(e.target.value);
                  setError('');
                }}
                placeholder="ABC-123"
                className={cn(
                  "h-11 text-lg font-bold uppercase tracking-[0.2em] bg-white/5 border-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all rounded-xl text-center",
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
                    className="absolute -bottom-4 left-1 text-[9px] font-bold text-destructive uppercase tracking-wide"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 ml-1">
              Tipo de Vehículo
            </Label>
            <RadioGroup 
              value={type} 
              onValueChange={(val) => setType(val as VehicleType)}
              className="grid grid-cols-2 gap-2.5"
            >
              <div className="relative">
                <RadioGroupItem value="car" id="car" className="peer sr-only" />
                <Label
                  htmlFor="car"
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-300",
                    type === 'car' 
                      ? "bg-primary text-primary-foreground shadow-md scale-[1.02]" 
                      : "ring-[0.5px] ring-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg mb-1 transition-colors",
                    type === 'car' ? "bg-white/20 text-white" : "bg-white/5"
                  )}>
                    <Car className="h-4.5 w-4.5" />
                  </div>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-[0.2em]",
                    type === 'car' ? "text-white" : ""
                  )}>Carro</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="motorcycle" id="motorcycle" className="peer sr-only" />
                <Label
                  htmlFor="motorcycle"
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-300",
                    type === 'motorcycle' 
                      ? "bg-primary text-primary-foreground shadow-md scale-[1.02]" 
                      : "ring-[0.5px] ring-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg mb-1 transition-colors",
                    type === 'motorcycle' ? "bg-white/20 text-white" : "bg-white/5"
                  )}>
                    <Bike className="h-4.5 w-4.5" />
                  </div>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-[0.2em]",
                    type === 'motorcycle' ? "text-white" : ""
                  )}>Moto</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full h-11 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all gap-2 bg-indigo-600 hover:bg-indigo-500 text-white group/btn border-transparent">
            <CheckCircle2 className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            REGISTRAR
          </Button>
        </form>
      </DialogContent>

      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 bg-indigo-600 text-white hover:bg-indigo-500 z-40 p-0 flex items-center justify-center group border border-indigo-400/30">
          <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
