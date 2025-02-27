import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  Card,
  TableSortLabel,
  Chip,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  getProducts,
  deleteProduct,
  IProduct,
  NewProduct,
} from "@/services/api";
import ConfirmDeleteModal from "../ConfirmDelete/ConfirmDelete";
import { createChunkPagination } from "@/lib/createChunkPagination";
import AddProductForm from "../AddProductForm/AddProductForm";
import EditProductForm from "../EditProductForm/EditProductForm";
import { categories } from "../constants";

interface Pagination {
  rowsPerPage: number;
  page: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IProduct>("rating");
  const [pagination, setPagination] = useState<Pagination>({
    rowsPerPage: 5,
    page: 0,
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getProducts(category, order);
      setProducts(response);
    } catch (error) {
      console.error("Erro ao carregar os produtos", error);
    }
  }, [category, order]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPagination({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const handleSortRequest = (property: keyof IProduct) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        const deletedProduct = await deleteProduct(productToDelete.id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== deletedProduct.id)
        );
        setOpenDeleteModal(false);
      } catch (error) {
        console.error("Erro ao tentar excluir o produto", error);
      }
    }
  };

  const handleCategoryFilterToggle = (categoryValue: string) => {
    if (categoryValue === category) {
      setCategory(undefined);
    } else {
      setCategory(categoryValue);
    }
  };

  const handleProductAdded = (newProduct: NewProduct) => {
    const productWithId: IProduct = {
      ...newProduct,
      id: Date.now(),
      rating: { rate: 0, count: 0 },
    };

    setProducts((prevProducts) => [productWithId, ...prevProducts]);
  };

  const handleProductUpdated = (updatedProduct: IProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (orderBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }
    return (b.rating?.rate || 0) - (a.rating?.rate || 0);
  });

  const paginatedHistoricalData =
    createChunkPagination({
      results: sortedProducts,
      size: pagination.rowsPerPage,
    })[pagination.page] || [];

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
        sx={{
          pb: 3,
          pt: 4,
          display: "inline-block",
          mx: "auto",
        }}
      >
        🛍️ Lista de Produtos
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="subtitle1">Filtros:</Typography>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              color={category === cat ? "primary" : "default"}
              onClick={() => handleCategoryFilterToggle(cat)}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setOpenAddModal(true)}
          sx={{
            alignSelf: { xs: "center", sm: "auto" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Novo Produto
        </Button>
      </Box>

      <Card sx={{ padding: 3 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 600, tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "price"}
                    direction={orderBy === "price" ? order : "asc"}
                    onClick={() => handleSortRequest("price")}
                  >
                    Preço
                  </TableSortLabel>
                </TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Classificação</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                paginatedHistoricalData.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title}
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product?.rating?.rate}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setProductToEdit(product);
                          setOpenEditModal(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setProductToDelete(product);
                          setOpenDeleteModal(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={products.length}
          page={pagination.page}
          onPageChange={handlePageChange}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteProduct}
      />
      <AddProductForm
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onProductAdded={handleProductAdded}
      />
      <EditProductForm
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        product={productToEdit}
        onProductUpdated={handleProductUpdated}
      />
    </Box>
  );
};

export default ProductList;
