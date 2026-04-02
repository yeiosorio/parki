import { UserCircle, Sun, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Logo } from "@/components/logo";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
        <Logo />

          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-primary/5 active:scale-95 transition-all w-9 h-9"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-xl hover:bg-primary/5 active:scale-95 transition-all w-9 h-9"
            >
              <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Cambiar tema</span>
            </Button>
          </div>
          
          <div className="hidden md:block h-6 w-px bg-border/50 mx-1" />

          <div className="flex items-center gap-2 pl-3 pr-1 py-1 bg-card dark:bg-white/5 rounded-xl border border-border shadow-sm">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold tracking-tight leading-tight">Admin User</span>
              <span className="text-[9px] font-medium text-primary/70 uppercase tracking-wider leading-tight">Operativo</span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 p-0.5 border border-primary/20 group-hover/user:scale-105 transition-transform duration-500 overflow-hidden">
               <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-primary" />
               </div>
            </div>
          </div>
        </div>
    </header>
  );
}
