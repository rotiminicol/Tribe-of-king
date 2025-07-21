import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sword, Shield, Crown, Star, Zap } from "lucide-react";
import nftWeaponsBg from "@/assets/nft-weapons-bg.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NFTCollection = () => {
  const navigate = useNavigate();
  const nftItems = [
    {
      id: 1,
      name: "Royal Executioner",
      type: "Weapon",
      rarity: "Legendary",
      power: 950,
      icon: Sword,
      equipped: true
    },
    {
      id: 2,
      name: "King's Guard Armor",
      type: "Armor",
      rarity: "Epic",
      power: 720,
      icon: Shield,
      equipped: true
    },
    {
      id: 3,
      name: "Crown of Victory",
      type: "Accessory",
      rarity: "Mythic",
      power: 1200,
      icon: Crown,
      equipped: false
    },
    {
      id: 4,
      name: "Lightning Striker",
      type: "Weapon",
      rarity: "Rare",
      power: 480,
      icon: Zap,
      equipped: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mythic": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Legendary": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Epic": return "bg-violet-500/20 text-violet-400 border-violet-500/30";
      case "Rare": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-primary/30 p-6 relative overflow-hidden shadow-3d hover:shadow-float transition-all duration-500 hover:scale-[1.02]">
        <div 
          className="absolute inset-0 opacity-30 animate-float"
          style={{
            backgroundImage: `url(${nftWeaponsBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-rotate-3d" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow animate-float">
              <Crown className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary animate-glow-pulse">Royal Arsenal</h2>
              <p className="text-muted-foreground text-lg">Your legendary collection awaits</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20">
              <p className="text-3xl font-bold text-primary animate-glow-pulse">12</p>
              <p className="text-sm text-muted-foreground">Epic NFTs</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20">
              <p className="text-3xl font-bold text-primary animate-glow-pulse">3,847</p>
              <p className="text-sm text-muted-foreground">Power Level</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20">
              <p className="text-3xl font-bold text-primary animate-glow-pulse">₭24.7K</p>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
          </div>
        </div>
      </Card>

      {/* NFT Grid */}
      <div className="space-y-4">
        {nftItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card 
              key={item.id} 
              className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="absolute inset-0 bg-gradient-glow opacity-5 animate-float" />
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-float border-2 border-primary/30">
                    <IconComponent className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-neon-glow" />
                  {item.equipped && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-glow-pulse shadow-glow">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -left-1 px-2 py-1 bg-black/80 rounded-full">
                    <span className="text-xs font-bold text-primary">#{item.id}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                    <Badge className={`${getRarityColor(item.rarity)} animate-glow-pulse`}>
                      {item.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 font-medium">{item.type} • Genesis Collection</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-primary animate-glow-pulse" />
                      <span className="text-sm font-bold text-primary">{item.power}</span>
                    </div>
                    <div className="h-4 w-px bg-primary/30" />
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">₭{(item.power * 2.5).toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    variant={item.equipped ? "secondary" : "gaming"} 
                    size="sm"
                    className="min-w-20 shadow-button hover:shadow-glow transition-all duration-300"
                    onClick={() => toast.success('NFT equipped!')}
                  >
                    {item.equipped ? "Equipped" : "Equip"}
                  </Button>
                  <Button variant="outline" size="sm" className="min-w-20 border-primary/50 hover:border-primary" onClick={() => toast.success('NFT upgraded!')}>
                    Upgrade
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button variant="hero" className="w-full h-20 shadow-button hover:shadow-float transition-all duration-300 hover:scale-105 relative overflow-hidden" onClick={() => navigate('/marketplace')}>
          <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-primary-foreground/20 rounded-full">
              <Crown className="w-8 h-8 text-primary-foreground animate-glow-pulse" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-primary-foreground">Royal Marketplace</p>
              <p className="text-sm text-primary-foreground/80">Discover legendary NFTs</p>
            </div>
          </div>
        </Button>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => toast.success('NFT forged!')}>
            <div className="text-center">
              <Sword className="w-6 h-6 mx-auto mb-1 animate-float" />
              <span className="text-sm font-medium">Forge NFT</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-16 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => toast.success('All NFTs upgraded!')}>
            <div className="text-center">
              <Star className="w-6 h-6 mx-auto mb-1 animate-float" style={{animationDelay: '0.3s'}} />
              <span className="text-sm font-medium">Upgrade All</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NFTCollection;