import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-400 tracking-wider uppercase">
          TRANSMEDIK LEAGUE
        </h1>
      </div>
    </header>
  );
};

export default Header;