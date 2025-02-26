import Head from "next/head";
import WelcomeMessage from "@/components/WelcomeMessage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Eadskill Store</title>
        <meta name="description" content="Gerencie e visualize produtos com Eadskill Store. CRUD completo com filtros, paginação e ordenação." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <WelcomeMessage />
    </>
  );
}
