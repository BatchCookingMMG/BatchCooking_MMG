// src/features/filters/components/DifficultySelector.tsx
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DifficultySelector({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="TRES_FACILE">Très facile</option>
      <option value="FACILE">Facile</option>
      <option value="MOYENNE">Moyen</option>
    </select>
  );
}
