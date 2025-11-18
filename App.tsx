import React, { useState, useEffect } from 'react';
import { Player } from './types';
import StandingsTable from './components/StandingsTable';
import MatchInputForm from './components/MatchInputForm';
import PlayerManager from './components/PlayerManager';
import Header from './components/Header';

const INITIAL_RATING = 1500;
const MATCH_IMPORTANCE = 10; // Importance for a friendly match

const INITIAL_PLAYERS: Player[] = [
  { id: 1, name: 'Widy', matchesPlayed: 0, wins: 0, draws: 0, losses: 0, rating: INITIAL_RATING },
  { id: 2, name: 'Arby Urban', matchesPlayed: 0, wins: 0, draws: 0, losses: 0, rating: INITIAL_RATING },
  { id: 3, name: 'King Nawawi', matchesPlayed: 0, wins: 0, draws: 0, losses: 0, rating: INITIAL_RATING },
  { id: 4, name: 'Keysar', matchesPlayed: 0, wins: 0, draws: 0, losses: 0, rating: INITIAL_RATING },
];

const LOCAL_STORAGE_KEY = 'transmedikLeaguePlayers';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const savedPlayers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedPlayers) {
        const parsed = JSON.parse(savedPlayers);
        // Migrasi data lama jika 'points' masih ada
        return parsed.map((p: any) => ({ ...p, rating: p.rating ?? p.points ?? INITIAL_RATING }));
      }
      return INITIAL_PLAYERS;
    } catch (error) {
      console.error("Gagal memuat data pemain dari localStorage", error);
      return INITIAL_PLAYERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players));
    } catch (error) {
      console.error("Gagal menyimpan data pemain ke localStorage", error);
    }
  }, [players]);

  const addPlayer = (name: string) => {
    if (name.trim() === '') return;
    const newPlayer: Player = {
      id: Date.now(),
      name,
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      rating: INITIAL_RATING,
    };
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  const recordMatch = (player1Id: number, player2Id: number, winnerId: number | null) => {
    setPlayers(prevPlayers => {
      const newPlayers = prevPlayers.map(p => ({ ...p }));

      const player1 = newPlayers.find(p => p.id === player1Id);
      const player2 = newPlayers.find(p => p.id === player2Id);

      if (!player1 || !player2) return prevPlayers;

      // FIFA Ranking Formula: P = P_before + I * (W - W_e)
      const p1_before = player1.rating;
      const p2_before = player2.rating;

      const dr = p1_before - p2_before;
      
      const we1 = 1 / (1 + Math.pow(10, -dr / 600));

      let w1: number;

      player1.matchesPlayed++;
      player2.matchesPlayed++;

      if (winnerId === null) { // Draw
        w1 = 0.5;
        player1.draws++;
        player2.draws++;
      } else if (winnerId === player1Id) { // Player 1 wins
        w1 = 1;
        player1.wins++;
        player2.losses++;
      } else { // Player 2 wins
        w1 = 0;
        player2.wins++;
        player1.losses++;
      }
      
      const ratingChange = MATCH_IMPORTANCE * (w1 - we1);

      player1.rating += ratingChange;
      player2.rating -= ratingChange; // Perubahan rating pemain kedua adalah kebalikan dari pemain pertama

      return newPlayers;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <MatchInputForm players={players} onMatchRecord={recordMatch} />
            <PlayerManager onAddPlayer={addPlayer} />
          </div>
          <div className="lg:col-span-2">
            <StandingsTable players={players} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;