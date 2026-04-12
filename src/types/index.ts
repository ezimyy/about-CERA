export interface Bean {
  id: string;
  name: string;
  roastery: string;
  roastPoint: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  process: string;
  notes: string[];
}

export interface TastingNote {
  acidity: number; // 1-5
  body: number; // 1-5
  sweetness: number; // 1-5
  balance: number; // 1-5
  review: string;
}

export interface Recipe {
  id: string;
  beanId: string;
  tool: string; // e.g., V60, Aeropress
  dose: number; // g
  water: number; // ml
  temperature: number; // °C
  grindSize: string;
  totalTime: number; // seconds
  tastingNote?: TastingNote;
  date: string; // ISO String
}
