
import React from 'react';
import { Level } from '../types';

interface LevelButtonProps {
  level: Level;
  onClick: (levelId: number) => void;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, onClick }) => {
  return (
    <button
      className={`bg-gradient-to-br ${level.colorClasses} border-none rounded-2xl p-6 text-white text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1.5 flex flex-col justify-center items-center text-center min-h-[100px]`}
      onClick={() => onClick(level.id)}
    >
      <div>{level.title}</div>
      <div>{level.subtitle}</div>
    </button>
  );
};

export default LevelButton;
