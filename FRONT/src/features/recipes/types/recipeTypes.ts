
export type Recipe = {
  _id: number;
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

export type RecipeHeaderProps = {
  title: string;
};

export type RecipeImageProps = {
  image?: string | null;
}

export type RecipeIngredientsProps = {
  ingredients: Ingredient[];
};

export type RecipeStepsProps = {
  steps: Step[];
};

export type RecipeSummaryProps = {
    preparationTime: string;
    difficulty: string;
    peopleNumber: number;
    cost: string;
    tag: string; 
  };