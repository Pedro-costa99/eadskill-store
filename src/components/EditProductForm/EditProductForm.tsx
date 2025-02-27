import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { validationSchema } from "../AddProductForm/AddProductForm.validation";
import { updateProduct, IProduct, NewProduct } from "@/services/api";
import { categories } from "../constants";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: IProduct | null;
  onProductUpdated: (updatedProduct: IProduct) => void;
}

const EditProductForm: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  product,
  onProductUpdated,
}) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            title: product.title,
            price: String(product.price),
            description: product.description,
            category: product.category,
            image: product.image || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const updatedProduct: NewProduct = {
                title: values.title,
                price: Number(values.price),
                description: values.description,
                category: values.category,
                image: values.image,
              };

              const updatedProductWithId = await updateProduct(
                product.id,
                updatedProduct
              );

              onProductUpdated(updatedProductWithId);

              onClose();
            } catch (error) {
              console.error("Erro ao atualizar produto", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, handleChange, values, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                label="Título"
                name="title"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.title}
                error={Boolean(errors.title && touched.title)}
                helperText={touched.title && errors.title}
              />

              <Field
                as={TextField}
                label="Preço"
                name="price"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.price}
                error={Boolean(errors.price && touched.price)}
                helperText={touched.price && errors.price}
              />

              <Field
                as={TextField}
                label="Descrição"
                name="description"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.description}
                error={Boolean(errors.description && touched.description)}
                helperText={touched.description && errors.description}
              />

              <Field
                as={TextField}
                select
                label="Categoria"
                name="category"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.category}
                error={Boolean(errors.category && touched.category)}
                helperText={touched.category && errors.category}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Field>

              <Field
                as={TextField}
                label="Imagem (URL)"
                name="image"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.image}
                error={Boolean(errors.image && touched.image)}
                helperText={touched.image && errors.image}
              />

              <DialogActions>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  size="small"
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductForm;
