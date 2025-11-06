
import React, { useState, useEffect } from 'react';
import { Player } from '../types';

interface MatchInputFormProps {
  players: Player[];
  onMatchRecord: (player1Id: number, player2Id: number, winnerId: number | null) => void;
}

const MatchInputForm: React.FC<MatchInputFormProps> = ({ players, onMatchRecord }) => {
  const [player1Id, setPlayer1Id] = useState<string>('');
  const [player2Id, setPlayer2Id] = useState<string>('');

  useEffect(() => {
    if (players.length >= 2) {
      setPlayer1Id(String(players[0].id));
      setPlayer2Id(String(players[1].id));
    }
  }, [players]);

  const handleSubmit = (winnerId: number | null) => {
    if (!player1Id || !player2Id || player1Id === player2Id) {
      alert('Pilih dua pemain yang berbeda.');
      return;
    }
    onMatchRecord(Number(player1Id), Number(player2Id), winnerId);
  };

  const getPlayerName = (id: string) => players.find(p => p.id === Number(id))?.name || 'Pemain';

  const commonSelectClasses = "w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition";
  const commonButtonClasses = "w-full p-3 font-bold rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const arePlayersSelected = player1Id && player2Id && player1Id !== player2Id;

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Catat Pertandingan</h2>
      {players.length < 2 ? (
        <p className="text-gray-400 text-center">Butuh minimal 2 pemain untuk mencatat pertandingan.</p>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <select
              value={player1Id}
              onChange={(e) => setPlayer1Id(e.target.value)}
              className={commonSelectClasses}
            >
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <span className="font-bold text-gray-400">VS</span>
            <select
              value={player2Id}
              onChange={(e) => setPlayer2Id(e.target.value)}
              className={commonSelectClasses}
            >
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Siapa yang Menang?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => handleSubmit(Number(player1Id))}
                disabled={!arePlayersSelected}
                className={`${commonButtonClasses} bg-green-600 hover:bg-green-500`}
              >
                {getPlayerName(player1Id)} Menang
              </button>
              <button
                onClick={() => handleSubmit(null)}
                disabled={!arePlayersSelected}
                className={`${commonButtonClasses} bg-yellow-600 hover:bg-yellow-500`}
              >
                Seri
              </button>
              <button
                onClick={() => handleSubmit(Number(player2Id))}
                disabled={!arePlayersSelected}
                className={`${commonButtonClasses} bg-green-600 hover:bg-green-500`}
              >
                {getPlayerName(player2Id)} Menang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchInputForm;
