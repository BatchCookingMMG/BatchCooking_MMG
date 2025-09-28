import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GenerateBatchButton from "@/features/batch/components/GenerateBatchButton";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("GenerateBatchButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("n’affiche rien si aucune recette", () => {
    render(
      <MemoryRouter>
        <GenerateBatchButton recipes={[]} />
      </MemoryRouter>
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("navigue avec les bons IDs quand on clique", () => {
    const recipes = [{ id: 1 }, { id: 2 }] as any;

    render(
      <MemoryRouter>
        <GenerateBatchButton recipes={recipes} />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Générer mon Batch Cooking/i })
    );

    expect(navigateMock).toHaveBeenCalledWith("/batch", {
      state: { recipeIds: [1, 2] },
    });
  });
});
