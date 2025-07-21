import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Sword, Shield, Crown, ShoppingCart } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home, path: '/' },
  { label: 'Battle', icon: Sword, path: '/battle-royale' },
  { label: 'NFTs', icon: Shield, path: '/nft-arsenal' },
  { label: 'Leaderboard', icon: Crown, path: '/leaderboard' },
  { label: 'Market', icon: ShoppingCart, path: '/marketplace' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t border-primary/20 flex justify-around py-2 shadow-card">
      {navItems.map(({ label, icon: Icon, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className={`flex flex-col items-center text-xs px-2 py-1 transition-all duration-200 focus:outline-none ${
            location.pathname === path
              ? 'text-primary font-bold'
              : 'text-muted-foreground'
          }`}
        >
          <Icon className="w-6 h-6 mb-1" />
          {label}
        </button>
      ))}
    </nav>
  );
} 