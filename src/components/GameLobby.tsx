import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Clock, MapPin, Crown, Swords } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const GameLobby = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("battle-royale");
  const [isMatchmaking, setIsMatchmaking] = useState(false);

  const gameModes = [
    {
      id: "battle-royale",
      name: "Battle Royale",
      players: "100 Players",
      reward: "500 KC",
      duration: "15-20 min",
      description: "Classic last-player-standing battle"
    },
    {
      id: "squad",
      name: "Squad Battle",
      players: "4v4v4",
      reward: "200 KC", 
      duration: "10-12 min",
      description: "Team-based combat royale"
    },
    {
      id: "arena",
      name: "King's Arena",
      players: "1v1",
      reward: "150 KC",
      duration: "5-8 min", 
      description: "Skill-based dueling arena"
    }
  ];

  const activeMatches = [
    { map: "Crown Citadel", players: "87/100", status: "Starting Soon" },
    { map: "Royal Wasteland", players: "45/100", status: "Waiting" },
    { map: "Kingdom Falls", players: "92/100", status: "Starting Soon" }
  ];

  const startMatchmaking = async () => {
    setIsMatchmaking(true);
    toast.success("Entering matchmaking queue...", {
      description: "Finding worthy opponents for battle!"
    });
    
    // Simulate matchmaking
    setTimeout(() => {
      setIsMatchmaking(false);
      toast.success("Match found! Preparing for battle...");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-primary/30 p-6 shadow-3d hover:shadow-float transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-rotate-3d" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-float">
                <Swords className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-neon-glow" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-primary animate-glow-pulse">Battle Arena</h2>
              <p className="text-muted-foreground text-lg">Choose your destiny and claim victory</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-glow-pulse" />
                <p className="text-2xl font-bold text-primary">12,847</p>
              </div>
              <p className="text-sm text-muted-foreground">Warriors Online</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20">
              <p className="text-2xl font-bold text-primary animate-glow-pulse">247</p>
              <p className="text-sm text-muted-foreground">Active Battles</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Game Modes */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-6 h-6 text-primary animate-glow-pulse" />
          <h3 className="text-xl font-bold text-primary">Select Battle Mode</h3>
        </div>
        
        {gameModes.map((mode, index) => (
          <Card 
            key={mode.id}
            className={`bg-gradient-card border-primary/30 p-5 cursor-pointer transition-all duration-300 shadow-card hover:shadow-3d relative overflow-hidden ${
              selectedMode === mode.id ? 'border-primary shadow-glow scale-[1.02]' : 'hover:border-primary/50 hover:scale-[1.01]'
            }`}
            onClick={() => setSelectedMode(mode.id)}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="absolute inset-0 bg-gradient-glow opacity-5 animate-float" />
            {selectedMode === mode.id && (
              <div className="absolute inset-0 bg-primary/5 animate-float" />
            )}
            
            <div className="relative z-10 flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                selectedMode === mode.id ? 'bg-primary border-primary animate-glow-pulse' : 'border-primary/50'
              }`}>
                {selectedMode === mode.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-foreground text-lg">{mode.name}</h4>
                  <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-button animate-glow-pulse">
                    <Crown className="w-3 h-3 mr-1" />
                    {mode.reward}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{mode.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Users className="w-4 h-4" />
                    <span>{mode.players}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Clock className="w-4 h-4" />
                    <span>{mode.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-glow-pulse" />
                    <span>Live</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Active Matches */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-primary animate-glow-pulse" />
          <h3 className="text-xl font-bold text-primary">Live Battlegrounds</h3>
        </div>
        
        {activeMatches.map((match, index) => (
          <Card 
            key={index} 
            className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="absolute inset-0 bg-gradient-glow opacity-5 animate-float" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg animate-neon-glow" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">{match.map}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-muted-foreground font-medium">{match.players} warriors</p>
                    <div className="h-3 w-px bg-primary/30" />
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary font-medium">Elite Mode</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${
                  match.status === "Starting Soon" 
                    ? "bg-green-500/20 text-green-400 border-green-500/30 animate-glow-pulse"
                    : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                } shadow-card`}>
                  {match.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Rank: Gold+</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Play Button */}
      <div className="space-y-4">
        <Button 
          variant="hero" 
          className="w-full h-24 shadow-button hover:shadow-float transition-all duration-300 hover:scale-105 relative overflow-hidden text-xl font-bold"
          onClick={() => navigate('/battle-royale')}
          disabled={isMatchmaking}
        >
          <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-float" />
          {isMatchmaking ? (
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-8 h-8 border-3 border-current border-t-transparent rounded-full animate-spin" />
              <div className="text-left">
                <p className="text-xl font-bold">Finding Warriors...</p>
                <p className="text-sm opacity-80">Preparing for epic battle</p>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex items-center gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-full">
                <Trophy className="w-10 h-10 text-primary-foreground animate-glow-pulse" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-primary-foreground">ENTER BATTLE</p>
                <p className="text-sm text-primary-foreground/80">Join the royal conquest</p>
              </div>
            </div>
          )}
        </Button>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => toast.success('Party created!')}>
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-1 animate-float" />
              <span className="text-sm font-medium">Create Party</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-16 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => navigate('/leaderboard')}>
            <div className="text-center">
              <Crown className="w-6 h-6 mx-auto mb-1 animate-float" style={{animationDelay: '0.3s'}} />
              <span className="text-sm font-medium">Tournaments</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;