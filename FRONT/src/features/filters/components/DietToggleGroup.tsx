type Props = {
    vegetarien: boolean;
    sansPorc: boolean;
    onChange: (newValues: { vegetarien: boolean; sansPorc: boolean }) => void;
  };
  
  export default function DietToggleGroup({ vegetarien, sansPorc, onChange }: Props) {
    return (
      <div className="flex flex-col items-start gap-2">
        <label className="font-medium">Régime alimentaire spécifique :</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={vegetarien}
              onChange={() => onChange({ vegetarien: !vegetarien, sansPorc })}
            />
            <span>Végétarien 🥕</span>
          </label>
  
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sansPorc}
              onChange={() => onChange({ vegetarien, sansPorc: !sansPorc })}
            />
            <span>Sans porc 🐷</span>
          </label>
        </div>
      </div>
    );
  }
  