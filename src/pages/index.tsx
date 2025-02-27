import React from "react";
import Head from "next/head";
import ProductList from "@/components/ProductList/ProductList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Eadskill Store</title>
        <meta
          name="description"
          content="Gerencie e visualize produtos com Eadskill Store. CRUD completo com filtros, paginação e ordenação."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList />
    </>
  );
}
