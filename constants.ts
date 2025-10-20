
import { Level } from './types';

export const TOTAL_QUESTIONS = 10;
export const GAME_DURATION_SECONDS = 60;

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Niveau 1",
    subtitle: "Additions",
    colorClasses: "from-[#4facfe] to-[#00f2fe] shadow-cyan-500/30 hover:shadow-cyan-500/40",
  },
  {
    id: 2,
    title: "Niveau 2",
    subtitle: "Soustractions",
    colorClasses: "from-[#43e97b] to-[#38f9d7] shadow-green-500/30 hover:shadow-green-500/40",
  },
  {
    id: 3,
    title: "Niveau 3",
    subtitle: "Multiplications",
    colorClasses: "from-[#fa709a] to-[#fee140] shadow-yellow-500/30 hover:shadow-yellow-500/40",
    note: "Rappel : (+ × + = +), (– × + = –), (– × – = +)",
  },
  {
    id: 4,
    title: "Niveau 4",
    subtitle: "Les 4 opérations",
    colorClasses: "from-[#a8edea] to-[#fed6e3] shadow-pink-300/30 hover:shadow-pink-300/40 text-gray-700",
  },
  {
    id: 5,
    title: "Niveau 5",
    subtitle: "Opérations avec parenthèses",
    colorClasses: "from-[#ffecd2] to-[#fcb69f] shadow-orange-300/30 hover:shadow-orange-300/40 text-gray-700",
  },
  {
    id: 6,
    title: "Niveau 6",
    subtitle: "Opérations avec puissances",
    colorClasses: "from-[#ff9a9e] to-[#fecfef] shadow-pink-400/30 hover:shadow-pink-400/40 text-gray-700",
    note: "Rappel : 2² = 4, (–3)² = 9",
  },
  {
    id: 7,
    title: "Niveau 7",
    subtitle: "Challenges",
    colorClasses: "from-[#667eea] to-[#764ba2] shadow-indigo-500/30 hover:shadow-indigo-500/40",
  },
  {
    id: 8,
    title: "Niveau 8",
    subtitle: "Soustractions rationnelles",
    colorClasses: "from-[#ff6b6b] to-[#ee5a24] shadow-red-500/30 hover:shadow-red-500/40",
    note: "Rappel : a/b - c/d = (ad - bc)/(bd)",
  },
];
