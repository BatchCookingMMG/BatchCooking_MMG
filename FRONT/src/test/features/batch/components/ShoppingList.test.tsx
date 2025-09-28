import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ShoppingList from "@/features/batch/components/ShoppingList";

describe("ShoppingList", () => {
    it("affiche les ingrédients groupés par catégorie", () => {
        const shoppingList = {
            Tomate: { category: "Légumes", quantity: 2, unit: "pcs" },
            Pâtes: { category: "Épicerie", quantity: 500, unit: "g" },
            Sel: { category: "", quantity: null, unit: "" },
        };

        render(<ShoppingList shoppingList={shoppingList as any} />);

        expect(screen.getByText("Légumes")).toBeInTheDocument();
        expect(screen.getByText("Tomate : 2 pcs")).toBeInTheDocument();
        expect(screen.getByText("Épicerie")).toBeInTheDocument();
        expect(screen.getByText("Pâtes : 500 g")).toBeInTheDocument();
        expect(screen.getByText("Autres")).toBeInTheDocument();
        expect(screen.getByText("Sel")).toBeInTheDocument();
    });
});
