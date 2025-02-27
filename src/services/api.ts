import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export type NewProduct = Omit<IProduct, "id" | "rating">;

export const getProducts = async (
  category?: string,
  sortBy: "asc" | "desc" = "asc"
): Promise<IProduct[]> => {
  let url = `${API_URL}?&sort=${sortBy}`;
  if (category) url = `${API_URL}/category/${category}`;

  const { data } = await axios.get<IProduct[]>(url);
  return data;
};

export const getProduct = async (id: number): Promise<IProduct> => {
  const { data } = await axios.get<IProduct>(`${API_URL}/${id}`);
  return data;
};

export const addProduct = async (product: NewProduct): Promise<IProduct> => {
  const { data } = await axios.post<IProduct>(API_URL, product, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const updateProduct = async (
  id: number,
  product: Partial<NewProduct>
): Promise<IProduct> => {
  const { data } = await axios.put<IProduct>(`${API_URL}/${id}`, product, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const deleteProduct = async (id: number): Promise<IProduct> => {
  const { data } = await axios.delete<IProduct>(`${API_URL}/${id}`);
  return data;
};
