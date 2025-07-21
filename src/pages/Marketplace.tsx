import React from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Shield, Sword, Crown } from 'lucide-react';
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
  user_id: number;
}

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.id;
};

const fetchNFTs = async () => api('nft', {}, true);
// Simulate a buy by PATCHing the NFT's user_id to the current user
const buyNFT = async (nft_id: number, user_id: number) => api(`nft/${nft_id}`, {
  method: 'PATCH',
  body: JSON.stringify({ user_id })
}, true);

const Marketplace = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = getUserId();
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['marketplace-nfts'], queryFn: fetchNFTs });

  const buyMutation = useMutation({
    mutationFn: ({ nft_id, user_id }: { nft_id: number; user_id: number }) => buyNFT(nft_id, user_id),
    onSuccess: () => {
      toast.success('NFT purchased!', { dismissible: true });
      refetch();
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error('Failed to purchase NFT', { description: message, dismissible: true });
    }
  });

  // Exclude user's own NFTs from the marketplace
  const nftsForSale = Array.isArray(data) ? data.filter((nft: NFT) => nft.user_id !== userId) : [];

  return (
    <div className="min-h-screen bg-background px-4 pb-32">
      <header className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <h1 className="text-xl font-bold text-primary">Royal Marketplace</h1>
      </header>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2"><ShoppingCart className="w-6 h-6" /> Legendary NFTs</h2>
        {isLoading && <p className="text-muted-foreground">Loading NFTs...</p>}
        {isError && <p className="text-destructive">Failed to load NFTs.</p>}
        {nftsForSale.length === 0 && <p className="text-muted-foreground">No NFTs available for sale.</p>}
        <div className="space-y-4">
          {nftsForSale.map((nft: NFT) => (
            <div key={nft.id} className="bg-gradient-card border border-primary/20 rounded-lg p-4 flex flex-col gap-2 shadow-card">
              <div className="flex items-center gap-3">
                {nft.type === 'Weapon' ? <Sword className="w-8 h-8 text-primary" /> : nft.type === 'Armor' ? <Shield className="w-8 h-8 text-primary" /> : <Crown className="w-8 h-8 text-primary" />}
                <span className="font-bold text-lg text-primary">{nft.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{nft.rarity}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm">Power: {nft.power}</span>
                <Button
                  size="sm"
                  variant="gaming"
                  className="ml-auto"
                  onClick={() => buyMutation.mutate({ nft_id: nft.id, user_id: userId })}
                  disabled={buyMutation.isPending}
                >
                  Buy NFT
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace; 