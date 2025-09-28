import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RecipeStepsForBatch } from "@/features/batch/components/RecipeStepsForBatch";

describe("RecipeStepsForBatch", () => {
    it("affiche les étapes de chaque recette", () => {
        const recipes = [
            { title: "Pâtes", steps: ["Faire bouillir l’eau", "Cuire 10 min"] },
            { title: "Salade", steps: ["Laver", "Couper"] },
        ];

        render(<RecipeStepsForBatch recipes={recipes as any} />);

        expect(screen.getByText("Pâtes")).toBeInTheDocument();
        expect(screen.getByText("Cuire 10 min")).toBeInTheDocument();
        expect(screen.getByText("Salade")).toBeInTheDocument();
    });
});
