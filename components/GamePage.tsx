import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Level, Question } from '../types';
import { generateQuestionsForLevel } from '../services/gameService';
import { GAME_DURATION_SECONDS, TOTAL_QUESTIONS } from '../constants';

interface GamePageProps {
  level: Level;
  onGameEnd: (score: number) => void;
  onGoHome: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ level, onGameEnd, onGoHome }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'incorrect' } | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);

  useEffect(() => {
    setQuestions(generateQuestionsForLevel(level.id));
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswer('');
    setFeedback(null);
    setIsAnswered(false);
    setTimeLeft(GAME_DURATION_SECONDS);
  }, [level.id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameEnd(score);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, onGameEnd, score]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
      setIsAnswered(false);
    } else {
      onGameEnd(score);
    }
  }, [currentQuestionIndex, onGameEnd, score]);

  const checkAnswer = useCallback((answer: string) => {
    if (isAnswered) return;
    setIsAnswered(true);

    let isCorrect = false;
    if (currentQuestion.isFraction) {
        isCorrect = answer === currentQuestion.answer;
    } else {
        const userAnswerNum = parseFloat(answer);
        // Ensure we are comparing numbers to numbers to avoid type issues.
        isCorrect = !isNaN(userAnswerNum) && userAnswerNum === Number(currentQuestion.answer);
    }
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ message: '✅ Bonne réponse !', type: 'correct' });
    } else {
      setFeedback({ message: `❌ Mauvaise réponse. La bonne réponse était ${currentQuestion.answer}`, type: 'incorrect' });
    }

    setTimeout(handleNextQuestion, 2000);
  }, [isAnswered, currentQuestion, handleNextQuestion]);

  const handleVerifyClick = () => {
    if (currentQuestion.isFraction) {
      if(userAnswer) checkAnswer(userAnswer);
    } else {
      checkAnswer(userAnswer);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };
  
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          handleVerifyClick();
      }
  };

  const timerDisplay = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  if (!currentQuestion) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-8 shadow-xl w-full max-w-md text-center">
      <div className="relative mb-5">
        <button onClick={onGoHome} className="absolute left-0 top-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md hover:-translate-y-0.5 transition-transform">
          ← Retour
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 pt-1">{level.title}</h2>
        <p className="text-lg text-gray-500 mt-1">{`Question ${currentQuestionIndex + 1} / ${TOTAL_QUESTIONS}`}</p>
      </div>

      <div className={`text-2xl font-bold p-3 rounded-xl border-2 mb-5 ${timeLeft <= 10 ? 'text-red-600 bg-red-100 border-red-500 timer-warning' : 'text-gray-600 bg-gray-100 border-gray-300'}`}>
        ⏰ Temps restant : {timerDisplay}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 sm:p-8 mb-6 border-2 border-gray-200 min-h-[250px] flex flex-col justify-center">
        {level.note && <p className="text-base text-gray-500 italic mb-3">{level.note}</p>}
        <p className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">{currentQuestion.text}</p>
        
        {currentQuestion.isFraction && currentQuestion.choices ? (
          <div className="flex flex-col gap-3 mt-4 w-full max-w-xs mx-auto">
            {currentQuestion.choices.map((choice, index) => (
                <button 
                    key={index} 
                    onClick={() => {
                        setUserAnswer(choice);
                        if (!isAnswered) checkAnswer(choice);
                    }}
                    disabled={isAnswered}
                    className={`p-4 rounded-xl text-lg font-semibold border-2 transition-all duration-300 w-full
                        ${isAnswered 
                            ? (choice === currentQuestion.answer ? 'bg-gradient-to-br from-green-400 to-teal-400 border-green-500 text-white' : (choice === userAnswer ? 'bg-gradient-to-br from-red-500 to-orange-500 border-red-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-500'))
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400'
                        }`}
                >
                    {choice}
                </button>
            ))}
          </div>
        ) : (
          <input
            type="number"
            value={userAnswer}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder="?"
            disabled={isAnswered}
            className="text-2xl p-4 border-2 border-gray-300 rounded-xl w-40 text-center mx-auto block focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            autoFocus
          />
        )}
      </div>

      {!currentQuestion.isFraction && (
        <button onClick={handleVerifyClick} disabled={isAnswered} className="w-full max-w-xs bg-gradient-to-br from-cyan-400 to-blue-500 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
          Vérifier
        </button>
      )}

      {feedback && (
        <div className={`mt-5 p-4 rounded-lg font-semibold text-lg ${feedback.type === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default GamePage;