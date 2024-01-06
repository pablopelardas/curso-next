import { getPaginatedproducts } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Readonly<Props>) {
  const page = searchParams.page ? +searchParams.page : 1;
  const { products, currentPage, totalPages } = await getPaginatedproducts({
    page,
  });
  if (!products.length) redirect("/");
  return (
    <div className="flex min-h-screen flex-col ">
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
