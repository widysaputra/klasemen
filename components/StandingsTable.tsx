import React from 'react';
import { Player } from '../types';

interface StandingsTableProps {
  players: Player[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    // Optional: add secondary sorting criteria, e.g., wins
    return b.wins - a.wins;
  });

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Klasemen</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-600">
            <tr>
              <th className="p-3 font-semibold tracking-wide text-center">#</th>
              <th className="p-3 font-semibold tracking-wide">Pemain</th>
              <th className="p-3 font-semibold tracking-wide text-center">M</th>
              <th className="p-3 font-semibold tracking-wide text-center">W</th>
              <th className="p-3 font-semibold tracking-wide text-center">D</th>
              <th className="p-3 font-semibold tracking-wide text-center">L</th>
              <th className="p-3 font-semibold tracking-wide text-center">Rating</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr key={player.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                <td className="p-3 text-center font-bold text-cyan-400">{index + 1}</td>
                <td className="p-3 font-medium">{player.name}</td>
                <td className="p-3 text-center">{player.matchesPlayed}</td>
                <td className="p-3 text-center text-green-400">{player.wins}</td>
                <td className="p-3 text-center text-yellow-400">{player.draws}</td>
                <td className="p-3 text-center text-red-400">{player.losses}</td>
                <td className="p-3 text-center font-bold">{Math.round(player.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
         {players.length === 0 && <p className="text-center text-gray-400 mt-6">Belum ada pemain. Tambahkan pemain untuk memulai.</p>}
      </div>
    </div>
  );
};

export default StandingsTable;