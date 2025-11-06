
import React, { useState } from 'react';

interface PlayerManagerProps {
  onAddPlayer: (name: string) => void;
}

const PlayerManager: React.FC<PlayerManagerProps> = ({ onAddPlayer }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name);
      setName('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Tambah Pemain Baru</h2>
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Pemain"
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 font-bold rounded-md transition duration-200"
        >
          Tambah
        </button>
      </form>
    </div>
  );
};

export default PlayerManager;
