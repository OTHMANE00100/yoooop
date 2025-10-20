
import { Question } from '../types';
import { TOTAL_QUESTIONS } from '../constants';

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateSingleQuestion = (level: number): Question => {
  let text = '';
  let answer: number | string = 0;
  let choices: string[] | undefined = undefined;
  let isFraction = false;

  switch (level) {
    case 1: { // Additions
      const a = randInt(-10, 10);
      const b = randInt(-10, 10);
      text = `${a < 0 ? `(${a})` : a} + ${b < 0 ? `(${b})` : b} = ?`;
      answer = a + b;
      break;
    }
    case 2: { // Soustractions
      const a = randInt(-10, 10);
      const b = randInt(-10, 10);
      text = `${a} – ${b < 0 ? `(${b})` : b} = ?`;
      answer = a - b;
      break;
    }
    case 3: { // Multiplications
      const a = randInt(-5, 5);
      const b = randInt(-5, 5);
      text = `${a < 0 ? `(${a})` : a} × ${b < 0 ? `(${b})` : b} = ?`;
      answer = a * b;
      break;
    }
    case 4: { // Les 4 opérations
      const opType = randInt(1, 4);
      if (opType === 1) { // Addition
        const a = randInt(-10, 10);
        const b = randInt(-10, 10);
        text = `${a < 0 ? `(${a})` : a} + ${b < 0 ? `(${b})` : b} = ?`;
        answer = a + b;
      } else if (opType === 2) { // Soustraction
        const a = randInt(-10, 10);
        const b = randInt(-10, 10);
        text = `${a} – ${b < 0 ? `(${b})` : b} = ?`;
        answer = a - b;
      } else if (opType === 3) { // Multiplication
        const a = randInt(-5, 5);
        const b = randInt(-5, 5);
        text = `${a < 0 ? `(${a})` : a} × ${b < 0 ? `(${b})` : b} = ?`;
        answer = a * b;
      } else { // Division
        const b = randInt(2, 9);
        const quotient = randInt(1, 9);
        const a = b * quotient;
        text = `${a} ÷ ${b} = ?`;
        answer = a / b;
      }
      break;
    }
    case 5: { // Parenthèses
      const a = randInt(1, 10);
      const b = randInt(1, 10);
      const c = randInt(1, 5);
      const patterns = [
        [`(${a} + ${b}) × ${c}`, (a + b) * c],
        [`${a} – (${b} + ${c})`, a - (b + c)],
        [`(${a} – ${b}) × ${c}`, (a - b) * c],
      ];
      const [qText, qAnswer] = patterns[randInt(0, patterns.length - 1)];
      text = `${qText} = ?`;
      answer = qAnswer as number;
      break;
    }
    case 6: { // Puissances
      const base = randInt(2, 6);
      const add = randInt(1, 10);
      const patterns = [
        [`${base}² + ${add}`, Math.pow(base, 2) + add],
        [`${base}³ – ${add}`, Math.pow(base, 3) - add],
        [`(–${base})² + ${add}`, Math.pow(-base, 2) + add],
      ];
      const [qText, qAnswer] = patterns[randInt(0, patterns.length - 1)];
      text = `${qText} = ?`;
      answer = qAnswer as number;
      break;
    }
    case 7: { // Challenges
      const challenges = [
          [`Le double de (–3) plus 5, divisé par 2`, ((-3 * 2) + 5) / 2],
          [`La somme de 4² et de –6`, Math.pow(4, 2) + (-6)],
          [`Le triple de (2 – 5) multiplié par (–2)`, (3 * (2 - 5)) * (-2)],
          [`Le carré de (–2) moins le triple de 3`, Math.pow(-2, 2) - (3 * 3)],
          [`(5 + 3) au carré divisé par 4`, Math.pow(5 + 3, 2) / 4]
      ];
      const [qText, qAnswer] = challenges[randInt(0, challenges.length - 1)];
      text = qText as string;
      answer = qAnswer as number;
      break;
    }
    case 8: { // Soustractions rationnelles
      isFraction = true;
      const gcd = (a: number, b: number): number => {
          a = Math.abs(a);
          b = Math.abs(b);
          while (b) {
              [a, b] = [b, a % b];
          }
          return a;
      };
      
      const simplify = (num: number, den: number): string => {
        const common = gcd(num, den);
        const finalNum = num / common;
        const finalDen = den / common;
        return finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;
      };

      const num1 = randInt(1, 9);
      const den1 = randInt(2, 9);
      const num2 = randInt(1, 9);
      const den2 = randInt(2, 9);

      text = `${num1}/${den1} – ${num2}/${den2} = ?`;
      const correctNum = num1 * den2 - num2 * den1;
      const correctDen = den1 * den2;
      
      const correctAnswer = simplify(correctNum, correctDen);
      answer = correctAnswer;

      const wrongAnswers = new Set<string>();
      wrongAnswers.add(simplify(num1 - num2, den1 - den2));
      wrongAnswers.add(simplify(num1 + num2, den1 + den2));
      wrongAnswers.add(simplify(Math.abs(correctNum) + 1, correctDen));
      wrongAnswers.add(simplify(correctNum, correctDen + 1));
      
      const choiceSet = new Set([correctAnswer]);
      for(const wa of wrongAnswers) {
          if (wa !== correctAnswer && choiceSet.size < 3) {
              choiceSet.add(wa);
          }
      }

      while (choiceSet.size < 3) {
          choiceSet.add(simplify(randInt(-10, 10), randInt(2,15)));
      }
      
      choices = Array.from(choiceSet).sort(() => Math.random() - 0.5);
      break;
    }
    default:
      text = "Niveau inconnu";
      answer = 0;
  }

  return { text, answer, choices, isFraction };
};

export const generateQuestionsForLevel = (level: number): Question[] => {
  return Array.from({ length: TOTAL_QUESTIONS }, () => generateSingleQuestion(level));
};
