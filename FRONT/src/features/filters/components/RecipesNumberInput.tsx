import { useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function RecipesNumberInput({ value, onChange }: Props) {
  // État interne en string pour permettre la saisie libre
  const [text, setText] = useState(String(value));

  // Met à jour le texte en direct
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Quand l’utilisateur sort du champ → on normalise
  const handleBlur = () => {
    const num = parseInt(text, 10);
    if (isNaN(num)) {
      setText(String(value)); // revert à la valeur parent si vide
    } else {
      const clamped = Math.min(14, Math.max(2, num)); // bornes 2–14
      setText(String(clamped));
      onChange(clamped);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="recipes-number" className="text-sm font-semibold text-neutral-700">
        Nombre de repas
      </label>

      <div className="flex items-center gap-2">
        {/* Bouton - */}
        <button
          type="button"
          aria-label="Diminuer"
          className="h-10 w-10 rounded-xl border border-neutral-300 grid place-items-center select-none"
          onClick={() => {
            const newVal = Math.max(2, value - 1);
            setText(String(newVal));
            onChange(newVal);
          }}
        >
          −
        </button>

        {/* Champ texte contrôlé */}
        <input
          id="recipes-number"
          type="text" // 👈 text au lieu de number
          inputMode="numeric"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-11 w-20 text-center rounded-xl border border-neutral-300 text-[16px] bg-white"
        />

        {/* Bouton + */}
        <button
          type="button"
          aria-label="Augmenter"
          className="h-10 w-10 rounded-xl border border-neutral-300 grid place-items-center select-none"
          onClick={() => {
            const newVal = Math.min(14, value + 1);
            setText(String(newVal));
            onChange(newVal);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
