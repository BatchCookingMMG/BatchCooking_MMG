import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MutualizedSteps from "@/features/batch/components/MutualizedSteps";

describe("MutualizedSteps", () => {
    it("affiche les étapes mutualisées", () => {
        const steps = [
            { category: "Préparation", steps: ["Couper", "Éplucher"] },
            { category: "Cuisson", steps: ["Faire revenir", "Ajouter eau"] },
        ];

        render(<MutualizedSteps steps={steps} />);

        expect(screen.getByText("Préparation")).toBeInTheDocument();
        expect(screen.getByText("Couper")).toBeInTheDocument();
        expect(screen.getByText("Cuisson")).toBeInTheDocument();
        expect(screen.getByText("Ajouter eau")).toBeInTheDocument();
    });
});
