import React from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sword, Shield, Crown, Star, Zap } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NFT {
  id: number;
  name: string;
  type: string;
  rarity: string;
  power: number;
  equipped: boolean;
}

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.id;
};

const fetchNFTs = async (userId: number) => api(`nft?user_id=${userId}`, {}, true);
const equipNFT = async (nft_id: number, equipped: boolean) => api(`nft/${nft_id}`, {
  method: 'PATCH',
  body: JSON.stringify({ equipped })
}, true);
const upgradeNFT = async (nft_id: number, power: number) => api(`nft/${nft_id}`, {
  method: 'PATCH',
  body: JSON.stringify({ power })
}, true);

const NFTArsenal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = getUserId();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['nfts', userId],
    queryFn: () => fetchNFTs(userId),
    enabled: !!userId,
  });

  // Debug log
  console.log('NFTs data:', data, 'userId:', userId);

  // Handle array response only (Xano returns an array for /nft)
  const nfts: NFT[] = Array.isArray(data) ? data : [];

  const equipMutation = useMutation({
    mutationFn: ({ nft_id, equipped }: { nft_id: number; equipped: boolean }) => equipNFT(nft_id, equipped),
    onSuccess: () => {
      toast.success('NFT equipped/unequipped!', { dismissible: true });
      refetch();
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error('Failed to equip NFT', { description: message, dismissible: true });
    }
  });

  const upgradeMutation = useMutation({
    mutationFn: ({ nft_id, power }: { nft_id: number; power: number }) => upgradeNFT(nft_id, power),
    onSuccess: () => {
      toast.success('NFT upgraded!', { dismissible: true });
      refetch();
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error('Failed to upgrade NFT', { description: message, dismissible: true });
    }
  });

  return (
    <div className="min-h-screen bg-background px-4 pb-32">
      <header className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <h1 className="text-xl font-bold text-primary">NFT Arsenal</h1>
      </header>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2"><Shield className="w-6 h-6" /> Your NFTs</h2>
        {isLoading && <p className="text-muted-foreground">Loading NFTs...</p>}
        {isError && <p className="text-destructive">Failed to load NFTs.</p>}
        {nfts.length === 0 && !isLoading && !isError && <p className="text-muted-foreground">No NFTs found.</p>}
        <div className="space-y-4">
          {nfts.map((nft: NFT) => (
            <div key={nft.id} className="bg-gradient-card border border-primary/20 rounded-lg p-4 flex flex-col gap-2 shadow-card">
              <div className="flex items-center gap-3">
                {nft.type === 'Weapon' ? <Sword className="w-8 h-8 text-primary" /> : nft.type === 'Armor' ? <Shield className="w-8 h-8 text-primary" /> : <Crown className="w-8 h-8 text-primary" />}
                <span className="font-bold text-lg text-primary">{nft.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{nft.rarity}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm">Power: {nft.power}</span>
                <Button
                  size="sm"
                  variant={nft.equipped ? 'secondary' : 'gaming'}
                  className="ml-auto"
                  onClick={() => equipMutation.mutate({ nft_id: nft.id, equipped: !nft.equipped })}
                  disabled={equipMutation.isPending}
                >
                  {nft.equipped ? 'Unequip' : 'Equip'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => upgradeMutation.mutate({ nft_id: nft.id, power: nft.power + 100 })}
                  disabled={upgradeMutation.isPending}
                >
                  Upgrade
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTArsenal; 