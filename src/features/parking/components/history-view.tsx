import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, History as HistoryIcon, FileSpreadsheet, Search } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useParkiStore } from '@/stores/use-parki-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function HistoryView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const history = useParkiStore((state) => state.history);

  const filteredHistory = history.filter((session) => {
    if (!date) return true;
    const sessionDate = new Date(session.exitTime);
    return (
      sessionDate.getDate() === date.getDate() &&
      sessionDate.getMonth() === date.getMonth() &&
      sessionDate.getFullYear() === date.getFullYear()
    );
  });

  const exportToCSV = () => {
    if (filteredHistory.length === 0) return;

    const headers = ['Placa', 'Tipo', 'Entrada', 'Salida', 'Duración (min)', 'Total Pagado'];
    const rows = filteredHistory.map(s => [
      s.plate,
      s.type === 'car' ? 'Carro' : 'Moto',
      format(new Date(s.entryTime), 'yyyy-MM-dd HH:mm:ss'),
      format(new Date(s.exitTime), 'yyyy-MM-dd HH:mm:ss'),
      s.durationMinutes,
      s.totalToPay
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `parki-historial-${date ? format(date, 'yyyy-MM-dd') : 'completo'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-primary/10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
            <HistoryIcon className="h-3.5 w-3.5" />
            Registro Histórico
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-gradient">Historial</h2>
            <p className="text-muted-foreground text-sm font-medium">Sesiones de parqueo finalizadas.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[220px] justify-start text-left font-bold rounded-xl h-11 border-border/50 bg-card/60 shadow-sm group transition-all hover:border-primary/30",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border shadow-2xl rounded-2xl" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={es}
                className="p-4"
              />
            </PopoverContent>
          </Popover>

          <Button 
            onClick={exportToCSV}
            disabled={filteredHistory.length === 0}
            className="h-11 px-5 rounded-xl font-bold uppercase tracking-wider text-[10px] gap-2 shadow-md shadow-primary/10 transition-all active:scale-95"
          >
            <FileSpreadsheet className="h-4 w-4" />
            CSV
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm relative">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50 bg-muted/30">
                <TableHead className="h-11 font-bold text-[10px] uppercase tracking-wider text-primary pl-6">Placa</TableHead>
                <TableHead className="h-11 font-bold text-[10px] uppercase tracking-wider text-primary">Tipo</TableHead>
                <TableHead className="h-11 font-bold text-[10px] uppercase tracking-wider text-primary">Entrada / Salida</TableHead>
                <TableHead className="h-11 font-bold text-[10px] uppercase tracking-wider text-primary text-right">Duración</TableHead>
                <TableHead className="h-11 font-bold text-[10px] uppercase tracking-wider text-primary text-right pr-6">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((session, index) => (
                    <motion.tr
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: index * 0.05 }}
                      className="group border-border/30 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="py-4 pl-6">
                        <span className="text-base font-bold tracking-tight uppercase text-foreground group-hover:text-primary transition-colors">
                          {session.plate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-lg px-2.5 py-0.5 font-bold text-[9px] uppercase tracking-widest border-none",
                          session.type === 'car' ? "bg-blue-500/10 text-blue-500" : "bg-indigo-500/10 text-indigo-500"
                        )}>
                          {session.type === 'car' ? 'Carro' : 'Moto'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            {format(new Date(session.entryTime), "hh:mm a")} - {format(new Date(session.exitTime), "hh:mm a")}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase font-medium">
                            {format(new Date(session.exitTime), "dd MMM yyyy", { locale: es })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-muted text-[10px] font-bold tabular-nums">
                          {session.durationMinutes} min
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4 pr-6">
                        <span className="text-base font-bold tabular-nums text-primary">
                          ${session.totalToPay.toLocaleString()}
                        </span>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                        <Search className="h-12 w-12 text-muted-foreground" />
                        <p className="text-lg font-bold tracking-tight text-muted-foreground italic">
                          No hay registros para esta fecha
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
