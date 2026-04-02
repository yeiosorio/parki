import { useEffect, useState } from 'react';
import { Car, Bike, Timer, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useParkiStore } from '@/stores/use-parki-store';
import { formatDuration, type Vehicle, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [now, setNow] = useState(new Date());
  const checkoutVehicle = useParkiStore((state) => state.checkoutVehicle);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStop = () => {
    const session = checkoutVehicle(vehicle.id);
    if (session) {
      alert(`Salida registrada.\n\nPlaca: ${session.plate}\nTiempo: ${session.durationMinutes} min\nTotal a Pagar: $${session.totalToPay.toLocaleString()}`);
    }
  };

  const Icon = vehicle.type === 'car' ? Car : Bike;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="glass relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
          <Icon className="h-24 w-24 -rotate-12 transition-transform group-hover:rotate-0 duration-500" />
        </div>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl transition-colors duration-500",
              vehicle.type === 'car' 
                ? "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white" 
                : "bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white"
            )}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight uppercase leading-none">{vehicle.plate}</h3>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mt-1">
                Entrada {new Date(vehicle.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 z-10">
          <div className="flex flex-col items-center justify-center py-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 transition-all duration-500 group-hover:bg-primary/10">
            <div className="flex items-center gap-2 text-muted-foreground text-[9px] font-bold uppercase tracking-wider mb-0.5">
              <Timer className="h-3 w-3" />
              Tiempo Transcurrido
            </div>
            <div className="text-4xl font-bold tracking-tighter tabular-nums text-primary transition-transform group-hover:scale-105 duration-700">
              {formatDuration(vehicle.entryTime, now)}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 z-10">
          <Button 
            variant="destructive" 
            className="w-full gap-2 font-bold h-11 rounded-xl text-xs tracking-wider bg-destructive/90 hover:bg-destructive shadow-md shadow-destructive/10 group/btn"
            onClick={handleStop}
          >
            Finalizar Sesión
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

