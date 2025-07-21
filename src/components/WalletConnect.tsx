import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Crown, Coins, Trophy } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface WalletConnectProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  walletAddress?: string;
}

const WalletConnect = ({ onConnect, isConnected, walletAddress }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [wallet, setWallet] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    try {
      let data;
      if (isSignup) {
        data = await api("auth/signup", {
          method: "POST",
          body: JSON.stringify({ wallet_address: wallet, name, email, password })
        });
      } else {
        data = await api("auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password })
        });
      }
      if (data && data.authToken) {
        localStorage.setItem("token", data.authToken);
        onConnect(wallet);
        toast.success(isSignup ? "Account created!" : "Welcome back, King!", {
          description: isSignup ? "Your account has been created. You are now logged in." : "You have successfully logged in.",
          dismissible: true,
        });
        window.location.reload();
      } else {
        throw new Error("No token returned");
      }
    } catch (error: any) {
      toast.error("Login failed", {
        description: error?.message || "Please check your credentials and try again.",
        dismissible: true,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-card border-primary/30 p-6 shadow-3d hover:shadow-float transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 bg-gradient-primary rounded-full animate-float">
                <Wallet className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-neon-glow" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary text-lg">Royal Wallet</h3>
              <p className="text-sm text-muted-foreground font-mono">
                {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-6)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-glow-pulse" />
                <span className="text-xs text-green-400">Connected & Secured</span>
              </div>
            </div>
            <div className="relative">
              <Crown className="w-10 h-10 text-primary animate-glow-pulse" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-rotate-3d" />
            </div>
          </div>
        </Card>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2 animate-float" />
              <p className="text-2xl font-bold text-primary">Gold II</p>
              <p className="text-sm text-muted-foreground">Current Rank</p>
            </div>
          </Card>
          
          <Card className="bg-gradient-card border-primary/30 p-4 shadow-card hover:shadow-3d transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <Coins className="w-8 h-8 text-primary mx-auto mb-2 animate-float" style={{animationDelay: '0.5s'}} />
              <p className="text-2xl font-bold text-primary">15,420</p>
              <p className="text-sm text-muted-foreground">KingCoins</p>
            </div>
          </Card>
        </div>

        {/* Disconnect Button */}
        <Button variant="outline" className="w-full h-12 border-destructive/50 text-destructive hover:bg-destructive/10 transition-all duration-300">
          Disconnect Wallet
        </Button>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-card border-primary/30 p-8 text-center shadow-3d hover:shadow-float transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-rotate-3d" />
      
      <div className="relative z-10">
        <form className="space-y-6" onSubmit={handleAuth}>
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center animate-float shadow-glow">
                <Coins className="w-12 h-12 text-primary-foreground animate-rotate-3d" />
              </div>
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-neon-glow" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-glow-pulse">
                <Crown className="w-3 h-3 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-3 animate-glow-pulse">
              {isSignup ? "Create Account" : "Login to Kingdom"}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {isSignup
                ? "Sign up with your wallet address, email, and password to join the royal battle."
                : "Login with your email and password to continue."}
            </p>
          </div>
          <div className="space-y-4">
            {isSignup && (
              <>
                <input
                  type="text"
                  required
                  placeholder="Wallet Address"
                  className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  value={wallet}
                  onChange={e => setWallet(e.target.value)}
                  autoComplete="username"
                />
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </>
            )}
            {!isSignup && (
              <>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </>
            )}
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </div>
          <Button
            type="submit"
            disabled={isConnecting}
            variant="hero"
            size="lg"
            className="w-full h-16 text-lg font-bold shadow-button hover:shadow-float transition-all duration-300 hover:scale-105"
          >
            {isConnecting ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>{isSignup ? "Creating Account..." : "Logging in..."}</span>
              </div>
            ) : (
              <span>{isSignup ? "Create Account" : "Login"}</span>
            )}
          </Button>
          <div className="mt-4">
            <button
              type="button"
              className="text-primary underline text-sm hover:text-primary/80"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Already have an account? Login" : "New here? Create an account"}
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default WalletConnect;