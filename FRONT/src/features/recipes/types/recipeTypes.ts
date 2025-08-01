export type Recipe = {
  id: number;
  title: string;
  tag: string;
  preparationTime: string;
  difficulty: string;
  cost: string;
  peopleNumber: number;
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

export type RecipeListCard = {
  id: number;
  title: string;
  preparationTime: string;
  difficulty: string;
  image?: string | null;
};
