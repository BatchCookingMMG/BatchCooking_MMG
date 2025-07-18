import { ShoppingListItem } from '@/features/batch/types/BatchTypes';
import { ShoppingCart } from "lucide-react"

interface ShoppingListProps {
    shoppingList: Record<string, ShoppingListItem>;
}

type GroupedItems = {
    [category: string]: { ingredient: string; quantity: number | null; unit: string }[];
};

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList }) => {
    // Grouper les ingrédients par catégorie
    const grouped: GroupedItems = {};

    for (const [ingredient, item] of Object.entries(shoppingList)) {
        const category = item.category || 'Autres';
        if (!grouped[category]) grouped[category] = [];

        grouped[category].push({
            ingredient,
            quantity: item.quantity ?? null,
            unit: item.unit || '',
        });
    }
    return (
        <div className="md:col-span-1">
            <div className="bg-[#FDF8F4] border border-[#E6DCD2] rounded-xl p-6 shadow-sd w-full">
                <h2 className="flex items-center text-2xl font-bold mb-4">
                    <ShoppingCart className="mr-2" size={25} />
                    Liste de courses
                </h2>
                {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-4">
                        <h3 className="text-lg font-semibold underline mb-2">{category}</h3>
                        <ul className="pl-4 list-disc">
                            {items.map(({ ingredient, quantity, unit }) => (
                                <li key={ingredient}>
                                    {ingredient}
                                    {quantity !== null && ` : ${quantity} ${unit}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingList;
