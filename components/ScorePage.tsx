
import React, { useMemo } from 'react';
import { TOTAL_QUESTIONS } from '../constants';

interface ScorePageProps {
  score: number;
  onRestart: () => void;
  onGoHome: () => void;
}

const ScorePage: React.FC<ScorePageProps> = ({ score, onRestart, onGoHome }) => {
  const scoreMessage = useMemo(() => {
    if (score === TOTAL_QUESTIONS) return "Parfait ! Tu es un champion des maths ! 🏆";
    if (score >= 8) return "Excellent travail ! Continue comme ça ! 🌟";
    if (score >= 6) return "Bien joué ! Tu peux encore t'améliorer ! 👍";
    if (score >= 4) return "Pas mal ! Un peu plus d'entraînement et ce sera parfait ! 💪";
    return "Continue à t'entraîner, tu vas y arriver ! 🎯";
  }, [score]);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl w-full max-w-md text-center">
      <h2 className="text-3xl font-bold text-gray-700">🎉 Félicitations !</h2>
      <div className="text-5xl font-bold text-gray-800 my-6">
        {`Ton score : ${score} / ${TOTAL_QUESTIONS}`}
      </div>
      <p className="text-xl text-gray-600 mb-8 leading-relaxed">{scoreMessage}</p>
      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={onRestart}
          className="w-full max-w-xs bg-gradient-to-br from-green-400 to-cyan-500 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform"
        >
          Rejouer
        </button>
        <button
          onClick={onGoHome}
          className="w-full max-w-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
