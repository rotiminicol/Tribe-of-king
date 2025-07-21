import React from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface LeaderboardEntry {
  id: number;
  user_id: number;
  score: number;
  rank: number;
  created_at: string;
  user?: { name?: string; wallet_address?: string };
}

const fetchLeaderboard = async () => api('leaderboard', {}, true);
const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.id;
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const userId = getUserId();
  const { data, isLoading, isError } = useQuery({ queryKey: ['leaderboard'], queryFn: fetchLeaderboard });

  // Debug log
  console.log('Leaderboard data:', data, 'userId:', userId);

  // Handle both array and wrapped object responses
  const leaderboard: LeaderboardEntry[] = Array.isArray(data) ? data : data?.leaderboard || [];

  return (
    <div className="min-h-screen bg-background px-4 pb-32">
      <header className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <h1 className="text-xl font-bold text-primary">Leaderboard</h1>
      </header>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2"><Crown className="w-6 h-6" /> Top Kings</h2>
        {isLoading && <p className="text-muted-foreground">Loading leaderboard...</p>}
        {isError && <p className="text-destructive">Failed to load leaderboard.</p>}
        {Array.isArray(data) && data.length === 0 && <p className="text-muted-foreground">No leaderboard data found.</p>}
        <div className="space-y-2">
          {leaderboard.length === 0 && !isLoading && !isError && <p className="text-muted-foreground">No leaderboard data found.</p>}
          {leaderboard
            .sort((a: LeaderboardEntry, b: LeaderboardEntry) => a.rank - b.rank)
            .map((entry: LeaderboardEntry, idx: number) => (
              <div
                key={entry.id}
                className={`flex items-center gap-4 p-3 rounded-lg border shadow-card ${entry.user_id === userId ? 'bg-primary/10 border-primary' : 'bg-gradient-card border-primary/20'}`}
              >
                <span className={`text-lg font-bold w-8 text-center ${entry.rank === 1 ? 'text-amber-400' : entry.rank === 2 ? 'text-gray-300' : entry.rank === 3 ? 'text-yellow-600' : 'text-primary'}`}>{entry.rank}</span>
                <span className="flex-1 font-semibold text-primary truncate">{entry.user?.name || entry.user?.wallet_address || 'Unknown'}</span>
                <span className="text-lg font-mono text-primary">{entry.score}</span>
                {entry.user_id === userId && <span className="ml-2 px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">You</span>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 