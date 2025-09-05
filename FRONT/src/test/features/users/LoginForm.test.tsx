import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/features/users";
import * as usersHooks from "@/features/users";

const navigateMock = vi.fn();
let locationState: any = {};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({
      state: locationState,
      pathname: "/login",
      search: "",
      hash: "",
      key: "test",
    }),
  };
});

describe("LoginForm", () => {
  const mockOnSuccess = vi.fn();

  const mockUseLoginForm = (
    overrides: Partial<ReturnType<typeof usersHooks.useLoginForm>> = {}
  ) => {
    const defaults = {
      email: "test@example.com",
      password: "password123",
      loading: false,
      error: null,
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit: vi.fn(),
    };
    vi.spyOn(usersHooks, "useLoginForm").mockReturnValue({
      ...defaults,
      ...overrides,
    } as any);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    locationState = {};
  });

  it("affiche les champs email et mot de passe et le bouton", () => {
    render(
      <MemoryRouter>
        <LoginForm onSuccess={mockOnSuccess} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Se connecter/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Vous découvrez BatchCooking/i)
    ).toBeInTheDocument();
  });

  it("affiche une erreur si email ou mot de passe sont invalides", () => {
    mockUseLoginForm({ email: "", password: "", error: "Email requis" });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Email requis");
  });

  it("appelle handleSubmit quand on clique sur le bouton", () => {
    const handleSubmitMock = vi.fn((e) => e.preventDefault());
    mockUseLoginForm({ handleSubmit: handleSubmitMock });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Se connecter/i }));
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("désactive le bouton pendant le chargement", () => {
    mockUseLoginForm({ loading: true });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Connexion.../i });
    expect(button).toBeDisabled();
  });

  it("appelle onSuccess après un login réussi", async () => {
    const handleSubmitMock = vi.fn(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mockOnSuccess();
      }
    );
    mockUseLoginForm({ handleSubmit: handleSubmitMock });

    render(
      <MemoryRouter>
        <LoginForm onSuccess={mockOnSuccess} />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("redirige vers la page précédente après un login réussi", async () => {
    locationState = { from: { pathname: "/ma-page-precedente" } };

    const handleSubmitMock = vi.fn(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mockOnSuccess();
        navigateMock(locationState.from?.pathname || "/", { replace: true });
      }
    );
    mockUseLoginForm({ handleSubmit: handleSubmitMock });

    render(
      <MemoryRouter>
        <LoginForm onSuccess={mockOnSuccess} />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith("/ma-page-precedente", {
        replace: true,
      });
    });
  });
});
