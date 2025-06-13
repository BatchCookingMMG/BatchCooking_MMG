import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeSummaryType } from "@/features/recipes";
import { fetchRecipeSummary } from "@/features/recipes";

function RecipeSummary() {
  const { id } = useParams();
  console.log(id);
  const [summary, setSummary] = useState<RecipeSummaryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const getSummary = async () => {
      try {
        const data = await fetchRecipeSummary(Number(id));
        setSummary(data);
      } catch (err) {
        setError("Erreur lors de la récupération du résumé de la recette.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [id]);

  if (loading) return <p>Chargement du résumé...</p>;
  if (error) return <p>{error}</p>;
  if (!summary) return <p>Aucun résumé trouvé.</p>;

  return (
    <div>
      <p>
        <strong>Temps de préparation :</strong> {summary.preparationTime}
      </p>
      <p>
        <strong>Difficulté :</strong> {summary.difficulty}
      </p>
      <p>
        <strong>Nombre de personnes :</strong> {summary.peopleNumber}
      </p>
    </div>
  );
}

export default RecipeSummary;
