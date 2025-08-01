// src/features/filters/components/RecipesNumberInput.tsx
type Props = {
    value: number;
    onChange: (value: number) => void;
  };
  
  export default function RecipesNumberInput({ value, onChange }: Props) {
    return (
        <div className="flex flex-col items-center">
        {/* Label associé à l’input grâce à htmlFor + id */}
        <label htmlFor="recipes-number" className="text-sm font-semibold">
          Nombre de repas
        </label>
  
        <input
          id="recipes-number" // ✅ identifiant utilisé par le label
          type="number"
          min={2}
          max={14}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 text-center border rounded-md p-1 mt-1"
        />
      </div>
    );
  }
  