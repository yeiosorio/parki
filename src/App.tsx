import { useState } from "react";
import { ParkingDashboard } from "@/features/parking/components/parking-dashboard";
import { HistoryView } from "@/features/parking/components/history-view";
import { RegisterModal } from "@/features/parking/components/register-modal";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, History } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <ThemeProvider defaultTheme="light" storageKey="parki-ui-theme">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary/10 pb-24">
        <Header />
        
        <main className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="h-14 p-1.5 bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg">
                <TabsTrigger 
                  value="dashboard" 
                  className="rounded-xl px-8 h-full gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Panel Activo
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="rounded-xl px-8 h-full gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <History className="h-5 w-5" />
                  Histórico
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="focus-visible:outline-none focus-visible:ring-0">
              <ParkingDashboard />
            </TabsContent>

            <TabsContent value="history" className="focus-visible:outline-none focus-visible:ring-0">
              <HistoryView />
            </TabsContent>
          </Tabs>
        </main>

        <RegisterModal />
      </div>
    </ThemeProvider>
  );
}

export default App;
