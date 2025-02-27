import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddProductForm from "@/components/AddProductForm/AddProductForm";

describe("AddProductForm Component", () => {
  const mockOnClose = jest.fn();
  const mockOnProductAdded = jest.fn();

  it("renders correctly'", () => {
    render(
      <AddProductForm
        open={true}
        onClose={mockOnClose}
        onProductAdded={mockOnProductAdded}
      />
    );

    expect(screen.getByText("Adicionar Produto")).toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toBeInTheDocument();
    expect(screen.getByLabelText("Preço")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByLabelText("Categoria")).toBeInTheDocument();
    expect(screen.getByLabelText("Imagem (URL)")).toBeInTheDocument();
  });

  it("calls onClose prop when click in cancel button", async () => {
    const mockedOnClose = jest.fn();
    render(
      <AddProductForm
        open={true}
        onClose={mockedOnClose}
        onProductAdded={mockOnProductAdded}
      />
    );

    const cancelButton = screen.getByRole("button", {
      name: /cancelar/i,
    });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockedOnClose).toHaveBeenCalled();
    });
  });
});
