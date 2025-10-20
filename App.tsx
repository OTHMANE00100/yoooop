
import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import ScorePage from './components/ScorePage';
import { Page } from './types';
import { LEVELS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState<number>(0);

  const handleStartLevel = useCallback((levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentPage(Page.Game);
  }, []);

  const handleGameEnd = useCallback((score: number) => {
    setFinalScore(score);
    setCurrentPage(Page.Score);
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedLevel(null);
    setCurrentPage(Page.Home);
  }, []);

  const handleRestart = useCallback(() => {
    if (selectedLevel) {
      setCurrentPage(Page.Game);
    } else {
      handleGoHome();
    }
  }, [selectedLevel, handleGoHome]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Game:
        if (selectedLevel) {
          const levelData = LEVELS.find(l => l.id === selectedLevel);
          return (
            <GamePage
              level={levelData!}
              onGameEnd={handleGameEnd}
              onGoHome={handleGoHome}
            />
          );
        }
        return <HomePage onStartLevel={handleStartLevel} />;
      case Page.Score:
        return (
          <ScorePage
            score={finalScore}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
          />
        );
      case Page.Home:
      default:
        return <HomePage onStartLevel={handleStartLevel} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-400 to-purple-600 min-h-screen text-gray-800 w-full">
      <div className="container mx-auto p-5 flex flex-col items-center min-h-screen justify-center">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
