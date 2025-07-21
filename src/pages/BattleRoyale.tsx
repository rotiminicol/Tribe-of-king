import React from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Swords, Users, Crown } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const fetchBattles = async () => api('battle', {}, true);
const joinBattle = async (battle_id: number, user_id: number) =>
  api('battle_participant', {
    method: 'POST',
    body: JSON.stringify({ battle_id, user_id })
  }, true);

const getUserId = () => {
  // You should fetch the user profile from /auth/me and get the id
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.id;
};

interface Battle {
  id: number;
  type: string;
  status: string;
}

const BattleRoyale = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = getUserId();

  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['battles'], queryFn: fetchBattles });
  const mutation = useMutation({
    mutationFn: ({ battle_id, user_id }: { battle_id: number; user_id: number }) => joinBattle(battle_id, user_id),
    onSuccess: () => {
      toast.success('Joined battle!', { dismissible: true });
      refetch();
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error('Failed to join battle', { description: message, dismissible: true });
    }
  });

  return (
    <div className="min-h-screen bg-background px-4 pb-32">
      <header className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <h1 className="text-xl font-bold text-primary">Battle Royale</h1>
      </header>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2"><Swords className="w-6 h-6" /> Active Battles</h2>
        {isLoading && <p className="text-muted-foreground">Loading battles...</p>}
        {isError && <p className="text-destructive">Failed to load battles.</p>}
        {Array.isArray(data) && data.length === 0 && <p className="text-muted-foreground">No battles found.</p>}
        <div className="space-y-4">
          {Array.isArray(data) && data.map((battle: Battle) => (
            <div key={battle.id} className="bg-gradient-card border border-primary/20 rounded-lg p-4 flex flex-col gap-2 shadow-card">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg text-primary">{battle.type}</span>
                <span className="ml-auto text-xs text-muted-foreground">Status: {battle.status}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">Battle ID: {battle.id}</span>
                <Button
                  size="sm"
                  variant="gaming"
                  className="ml-auto"
                  onClick={() => mutation.mutate({ battle_id: battle.id, user_id: userId })}
                  disabled={mutation.isPending}
                >
                  Join Battle
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleRoyale; 