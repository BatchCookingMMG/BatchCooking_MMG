import { RecipeSummaryProps } from "@/features/recipes/types/recipeTypes";

const RecipeSummary = ({
  preparationTime,
  difficulty,
  peopleNumber,
  cost,
  tag,
}: RecipeSummaryProps) => {
  return (
    <div className="bg-[#edc59d] rounded-2xl p-6 text-sm text-gray-800 w-full max-w-md">
      <div className="flex justify-between">
        {/* Colonne gauche */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {/* Exemple d'icône : tu peux utiliser react-icons ou un SVG ici */}
            <span role="img" aria-label="personnes">
              🍽️
            </span>
            <span className="font-semibold">Personnes</span>
            <span className="ml-2">{peopleNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <span role="img" aria-label="difficulté">
              ⚙️
            </span>
            <span className="font-semibold">Difficulté</span>
            <span className="ml-2">{difficulty}</span>
          </div>

          <div className="flex items-center gap-2">
            <span role="img" aria-label="temps">
              ⏱️
            </span>
            <span className="font-semibold">Temps préparation</span>
            <span className="ml-2">{preparationTime}</span>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-4 text-right">
          <div>
            <span>{tag}</span>
          </div>

          <div>
            <span className="font-semibold">Coût</span>
            <br />
            <span>{cost}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSummary;
