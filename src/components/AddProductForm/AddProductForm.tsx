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
import { validationSchema } from "./AddProductForm.validation";
import { addProduct, NewProduct } from "@/services/api";
import { categories } from "../constants";



interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: (newProduct: NewProduct) => void;
}

const AddProductForm: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  onProductAdded,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Produto</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const newProduct: NewProduct = {
                ...values,
                price: Number(values.price),
              };
              await addProduct(newProduct);
              onProductAdded(newProduct);
              resetForm();
              onClose();
            } catch (error) {
              console.error("Erro ao adicionar produto", error);
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
                rows={2}
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
                  {isSubmitting ? "Adicionando..." : "Salvar"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
