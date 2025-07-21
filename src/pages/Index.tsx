import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletConnect from "@/components/WalletConnect";
import Dashboard from "@/components/Dashboard";
import NFTCollection from "@/components/NFTCollection";
import GameLobby from "@/components/GameLobby";
import { Crown, Gamepad2, Shield, Trophy, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const isAuthenticated = !!localStorage.getItem("token");

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-rotate-3d" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-primary-glow/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}} />
        
        <div className="relative z-10 p-4 h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full animate-slide-in-up">
              {/* Logo Header */}
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <img 
                    src="/logo.png" 
                    alt="Tribe of Kings" 
                    className="w-full max-w-sm mx-auto rounded-xl shadow-3d hover:shadow-float transition-all duration-500 animate-scale-bounce"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-xl animate-neon-glow" />
                </div>
                <h1 className="text-4xl font-bold text-primary mb-3 animate-glow-pulse">
                  Tribe of Kings
                </h1>
                <p className="text-muted-foreground text-lg">
                  Powered by KingCoin • Battle Royale Gaming
                </p>
                <div className="flex justify-center items-center mt-4 gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
                  <span className="text-sm text-primary font-medium">12,847 Players Online</span>
                  <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" style={{animationDelay: '0.5s'}} />
                </div>
              </div>

              <WalletConnect 
                onConnect={handleWalletConnect}
                isConnected={false}
                walletAddress={walletAddress}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary-glow/30 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}} />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/30 shadow-card">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 rounded-full shadow-glow animate-glow-pulse bg-white object-cover object-center border border-primary/30"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-neon-glow" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-primary">Tribe of Kings</h1>
              <p className="text-xs text-muted-foreground">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            </div>
            <div className="flex items-center gap-2 relative">
              <button className="relative w-9 h-9 rounded-full border border-primary/30 bg-background shadow-md flex items-center justify-center hover:bg-primary/10 transition-all focus:outline-none">
                <img src="/logo.png" alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full shadow-lg" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-2 py-1 rounded-full border border-primary/30 bg-background hover:bg-primary/10 transition-all text-primary text-xs font-semibold focus:outline-none shadow-sm flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Account</span>
                    <svg className="w-3 h-3 ml-1" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {/* TODO: navigate to profile page */}} className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm p-4">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-card border border-primary/30 shadow-card h-14">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-button transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs">Stats</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="game" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-button transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-1">
                  <Gamepad2 className="w-4 h-4" />
                  <span className="text-xs">Battle</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="nfts" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-button transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">NFTs</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-button transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-1">
                  <Crown className="w-4 h-4" />
                  <span className="text-xs">King</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-4 pb-6">
            <TabsContent value="dashboard" className="mt-0 animate-slide-in-up">
              <Dashboard walletAddress={walletAddress} />
            </TabsContent>

            <TabsContent value="game" className="mt-0 animate-slide-in-up">
              <GameLobby />
            </TabsContent>

            <TabsContent value="nfts" className="mt-0 animate-slide-in-up">
              <NFTCollection />
            </TabsContent>

            <TabsContent value="profile" className="mt-0 animate-slide-in-up">
              <WalletConnect 
                onConnect={handleWalletConnect}
                isConnected={true}
                walletAddress={walletAddress}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
