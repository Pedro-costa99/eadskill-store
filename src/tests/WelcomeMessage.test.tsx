import React from "react"; 
import { render, screen } from "@testing-library/react";
import WelcomeMessage from "@/components/WelcomeMessage";

describe("WelcomeMessage Component", () => {
  it("Renders correctly", () => {
    render(<WelcomeMessage />);

    expect(screen.getByText(/Bem-vindo à Eadskill Store/i)).toBeInTheDocument();
    expect(screen.getByText(/Aplicação para gerenciamento de produtos/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /BUTTON MUI/i })).toBeInTheDocument();
  });
});
