export type Recipe = {
  id: number;
  title: string;
  tag: string;
  preparation_time: string;
  difficulty: string;
  cost: string;
  people_number: number;
  ingredients: Ingredient[];
  steps: Step[];
  image?: string | null;
};

export type Ingredient = {
  quantity: number | null;
  unit: string;
  ingredient: string;
  category: string;
};

export type Step = {
  text: string;
};