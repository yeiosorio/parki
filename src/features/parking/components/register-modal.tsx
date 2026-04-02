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
        <Button className="fixed bottom-8 right-8 h-16 w-16 rounded-2xl shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all bg-primary text-primary-foreground border-2 border-white/20 z-[100]">
          <Plus className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-white dark:bg-slate-950 border-border shadow-2xl overflow-hidden p-0 rounded-3xl opacity-100">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
        
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold tracking-tight text-gradient">Registro de Entrada</DialogTitle>
          <p className="text-muted-foreground text-xs font-medium">Completa los datos del vehículo.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="plate" className="text-xs font-bold uppercase tracking-wider text-primary/70">
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
                  "h-12 text-xl font-bold uppercase tracking-[0.1em] bg-muted/20 border-2 transition-all rounded-xl",
                  error 
                    ? "border-destructive/50 focus-visible:border-destructive" 
                    : "border-border/50 focus-visible:border-primary focus-visible:ring-primary/10"
                )}
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-5 left-0 text-[10px] font-bold text-destructive uppercase tracking-wide"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-primary/70">
              Seleccionar Tipo
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
                    "flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-4",
                    type === 'car' 
                      ? "border-primary bg-primary/20 scale-[1.02] shadow-lg" 
                      : "border-border/10 bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <Car className={cn(
                    "h-8 w-8 mb-2 transition-colors",
                    type === 'car' ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    type === 'car' ? "text-primary" : "text-muted-foreground"
                  )}>Carro</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="motorcycle" id="motorcycle" className="peer sr-only" />
                <Label
                  htmlFor="motorcycle"
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-4",
                    type === 'motorcycle' 
                      ? "border-primary bg-primary/20 scale-[1.02] shadow-lg" 
                      : "border-border/10 bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <Bike className={cn(
                    "h-8 w-8 mb-2 transition-colors",
                    type === 'motorcycle' ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    type === 'motorcycle' ? "text-primary" : "text-muted-foreground"
                  )}>Moto</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full h-12 text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Registrar Entrada
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
