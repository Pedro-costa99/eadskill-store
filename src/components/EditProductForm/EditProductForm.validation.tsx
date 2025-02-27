import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(30, "O título pode ter no máximo 30 caracteres")
    .required("Título é obrigatório"),
  price: Yup.number()
    .positive("O preço deve ser um número positivo")
    .required("Preço é obrigatório"),
  description: Yup.string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .required("Descrição é obrigatória"),
  category: Yup.string().required("Categoria é obrigatória"),
  image: Yup.string()
    .url("URL da imagem inválida")
    .required("Imagem é obrigatória"),
});
