// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginatedOrders, getPaginatedproducts } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductsTable } from "./ui/ProductsTable";
import Link from "next/link";
interface Props {
  searchParams: {
    page?: string;
  };
}
export default async function ProductsPage({ searchParams }: Readonly<Props>) {
  const page = searchParams.page ? +searchParams.page : 1;
  const { products, totalPages } = await getPaginatedproducts({
    page,
  });

  return (
    <>
      <Title title="Mantenimiento de Productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <ProductsTable products={products} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
