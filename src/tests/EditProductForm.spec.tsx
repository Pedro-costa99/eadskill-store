import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditProductForm from "@/components/EditProductForm/EditProductForm";
import { IProduct } from "@/services/api";

describe("EditProductForm Component", () => {
  const mockOnClose = jest.fn();
  const mockOnProductUpdated = jest.fn();

  const mockProduct: IProduct = {
    id: 1,
    title: "Test Product",
    price: 100,
    description: "This is a test product",
    category: "electronics",
    image: "https://via.placeholder.com/150",
  };

  it("renders correctly", () => {
    render(
      <EditProductForm 
        open={true} 
        onClose={mockOnClose} 
        product={mockProduct} 
        onProductUpdated={mockOnProductUpdated} 
      />
    );

    expect(screen.getByText("Editar Produto")).toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toBeInTheDocument();
    expect(screen.getByLabelText("Preço")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByLabelText("Categoria")).toBeInTheDocument();
    expect(screen.getByLabelText("Imagem (URL)")).toBeInTheDocument();
  });

  it("calls onClose prop when clicking the cancel button", async () => {
    render(
      <EditProductForm 
        open={true} 
        onClose={mockOnClose} 
        product={mockProduct} 
        onProductUpdated={mockOnProductUpdated} 
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
