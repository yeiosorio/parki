import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParkiStore } from '@/stores/use-parki-store';
import { VehicleCard } from './vehicle-card';
import { Car, Bike, Inbox, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmptyState = ({ message }: { message: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-16 glass rounded-[2.5rem] opacity-60"
  >
    <div className="bg-muted p-4 rounded-full mb-4">
      <Inbox className="h-8 w-8 text-muted-foreground" />
    </div>
    <p className="text-xl font-bold tracking-tight text-muted-foreground">{message}</p>
  </motion.div>
);

export function ParkingDashboard() {
  const activeVehicles = useParkiStore((state) => state.activeVehicles);

  const cars = activeVehicles.filter(v => v.type === 'car');
  const motorcycles = activeVehicles.filter(v => v.type === 'motorcycle');


  return (
    <div className="w-full max-w-7xl mx-auto space-y-5 py-1">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-primary/10">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider"
          >
            <LayoutDashboard className="h-3 w-3" />
            Control Operativo
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-gradient">
              Dashboard En Vivo
            </h1>
            <p className="text-muted-foreground font-medium text-sm max-w-sm mt-1">
              Gestión de ocupación en tiempo real.
            </p>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 glass p-4 rounded-2xl border-white/20 shadow-lg relative overflow-hidden group"
        >
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="text-[10px] font-bold uppercase tracking-wider text-primary/70 mb-0.5">Ocupación</div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tighter tabular-nums drop-shadow-sm shimmer-text">
                {activeVehicles.length}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">espacios</span>
            </div>
          </div>

          <div className="h-12 w-px bg-primary/10 mx-2" />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-blue-500/80">
                <Car className="h-3 w-3" />
                Carros
              </div>
              <div className="text-2xl font-bold tracking-tighter tabular-nums">{cars.length}</div>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-indigo-500/80">
                <Bike className="h-3 w-3" />
                Motos
              </div>
              <div className="text-2xl font-bold tracking-tighter tabular-nums">{motorcycles.length}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Tabs defaultValue="all" className="w-full space-y-6">
        <TabsList className="h-12 p-1 glass rounded-2xl w-fit min-w-[280px]">
          <TabsTrigger value="all" className="rounded-xl px-8 h-full font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Todos
          </TabsTrigger>
          <TabsTrigger value="cars" className="rounded-xl px-8 h-full font-bold flex gap-2 transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Car className="h-4 w-4" />
            Carros
          </TabsTrigger>
          <TabsTrigger value="motorcycles" className="rounded-xl px-8 h-full font-bold flex gap-2 transition-all data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Bike className="h-4 w-4" />
            Motos
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent key="all" value="all" className="mt-0 outline-none">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {activeVehicles.length > 0 ? (
                activeVehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)
              ) : (
                <div className="col-span-full">
                  <EmptyState message="Silencio en el parqueadero..." />
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent key="cars" value="cars" className="mt-0 outline-none">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {cars.length > 0 ? (
                cars.map(v => <VehicleCard key={v.id} vehicle={v} />)
              ) : (
                <div className="col-span-full">
                  <EmptyState message="No hay carros estacionados." />
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent key="motorcycles" value="motorcycles" className="mt-0 outline-none">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {motorcycles.length > 0 ? (
                motorcycles.map(v => <VehicleCard key={v.id} vehicle={v} />)
              ) : (
                <div className="col-span-full">
                  <EmptyState message="Motos no encontradas." />
                </div>
              )}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
