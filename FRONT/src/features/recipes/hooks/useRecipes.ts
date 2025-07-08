import { useEffect, useState } from 'react';
import { Recipe } from '@/features/recipes/types/recipeTypes';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          'http://localhost:8083/api/recipes/random?recipesNumber=6'
        );
        if (!res.ok) throw new Error('Erreur lors du chargement');
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}
