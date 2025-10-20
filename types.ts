
export enum Page {
  Home,
  Game,
  Score,
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  colorClasses: string;
  note?: string;
}

export interface Question {
  text: string;
  answer: number | string;
  choices?: string[];
  isFraction?: boolean;
}
