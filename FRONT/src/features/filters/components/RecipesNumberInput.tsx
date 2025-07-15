// src/features/filters/components/RecipesNumberInput.tsx
type Props = {
    value: number;
    onChange: (value: number) => void;
  };
  
  export default function RecipesNumberInput({ value, onChange }: Props) {
    return (
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold">Nombre de repas</label>
        <input
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
  