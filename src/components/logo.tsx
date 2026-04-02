import { ParkingMeter } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className="relative">
        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-sm group-hover:bg-primary/30 transition-all duration-500" />
        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2.5 rounded-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-105 duration-500">
          <ParkingMeter className="h-6 w-6 text-primary-foreground animate-float" />
        </div>
      </div>
      {showText && (
        <span className="text-3xl font-black tracking-tighter uppercase sm:inline-block text-foreground ml-1">
          Park<span className="text-gradient">i</span>
          <span className="text-[10px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded-md ml-1 align-top tracking-widest">
            PRO
          </span>
        </span>
      )}
    </div>
  );
}
