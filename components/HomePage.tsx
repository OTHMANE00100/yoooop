
import React from 'react';
import { LEVELS } from '../constants';
import LevelButton from './LevelButton';
import Header from './Header';

interface HomePageProps {
  onStartLevel: (levelId: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartLevel }) => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-5 w-full max-w-md">
        {LEVELS.map((level) => (
          <LevelButton key={level.id} level={level} onClick={onStartLevel} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
