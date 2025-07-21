import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Coins, Trophy, Sword, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DashboardProps {
  walletAddress: string;
}

const Dashboard = ({ walletAddress }: DashboardProps) => {
  const navigate = useNavigate();
  const playerStats = {
    kingcoins: 15420,
    nfts: 12,
    wins: 47,
    kills: 234,
    rank: "Gold II"
  };

  return (
    <div className="space-y-6 pb-32 px-2">
      {/* Player Header */}
      <Card className="w-full bg-gradient-card border-primary/30 p-6 shadow-3d hover:shadow-float transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-glow opacity-10 animate-float" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-rotate-3d" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-18 h-18 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-float">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full shadow-glow animate-float bg-white" />
              </div>
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-neon-glow" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-glow-pulse">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary animate-glow-pulse">King Player</h2>
              <p className="text-muted-foreground font-mono text-sm">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Trophy className="w-5 h-5 text-primary animate-float" />
                <span className="text-lg font-bold text-primary">{playerStats.rank}</span>
                <div className="ml-2 px-2 py-1 bg-primary/20 rounded-full">
                  <span className="text-xs font-medium text-primary">Elite Warrior</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{playerStats.wins}</p>
              <p className="text-xs text-muted-foreground">Victories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{playerStats.kills}</p>
              <p className="text-xs text-muted-foreground">Total Kills</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">3,847</p>
              <p className="text-xs text-muted-foreground">Power Level</p>
            </div>
          </div>
        </div>
      </Card>

      {/* KingCoin Balance */}
      <Card className="w-full bg-gradient-card border-primary/30 p-6 shadow-3d hover:shadow-float transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 animate-float" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="KingCoin" 
                className="w-16 h-16 rounded-full shadow-glow animate-float border-2 border-primary/30"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-neon-glow" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary mb-1">KingCoin Treasury</h3>
              <p className="text-4xl font-bold text-primary animate-glow-pulse">
                {playerStats.kingcoins.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">+2,847 today</p>
            </div>
            <div className="space-y-2">
              <Button variant="gaming" size="sm" className="w-full shadow-button hover:shadow-glow transition-all duration-300" onClick={() => toast.success("Claimed KingCoins!")}>
                <Coins className="w-4 h-4 mr-2" />
                Claim
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success("Staked KingCoins!")}>
                Stake
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-secondary/30 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-primary h-full w-3/4 rounded-full animate-float" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Daily Goal</span>
            <span>74% Complete</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <Card className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-105 hover:rotate-1">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow animate-float">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">NFTs Arsenal</p>
              <p className="text-2xl font-bold text-primary">{playerStats.nfts}</p>
              <p className="text-xs text-green-400">+3 this week</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-105 hover:-rotate-1">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow animate-float" style={{animationDelay: '0.2s'}}>
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Victory Count</p>
              <p className="text-2xl font-bold text-primary">{playerStats.wins}</p>
              <p className="text-xs text-green-400">+5 today</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-105 hover:rotate-1">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow animate-float" style={{animationDelay: '0.4s'}}>
              <Sword className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Eliminations</p>
              <p className="text-2xl font-bold text-primary">{playerStats.kills}</p>
              <p className="text-xs text-green-400">+12 today</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-105 hover:-rotate-1">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow animate-float" style={{animationDelay: '0.6s'}}>
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Combat Power</p>
              <p className="text-2xl font-bold text-primary">2,847</p>
              <p className="text-xs text-green-400">+127 today</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4 w-full">
        <Button variant="gaming" className="w-full h-20 shadow-button hover:shadow-float transition-all duration-300 hover:scale-105 relative overflow-hidden" onClick={() => navigate('/battle-royale')}>
          <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-primary-foreground/20 rounded-full">
              <Trophy className="w-8 h-8 text-primary-foreground animate-glow-pulse" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-primary-foreground">Enter Royal Battle</p>
              <p className="text-sm text-primary-foreground/80">Join 12,847 warriors online</p>
            </div>
          </div>
        </Button>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => navigate('/nft-arsenal')}>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 animate-float" />
              <span className="text-sm font-medium">NFT Arsenal</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-16 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => navigate('/leaderboard')}>
            <div className="text-center">
              <Crown className="w-6 h-6 mx-auto mb-1 animate-float" style={{animationDelay: '0.3s'}} />
              <span className="text-sm font-medium">Leaderboard</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;