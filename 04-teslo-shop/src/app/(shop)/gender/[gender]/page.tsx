export const revalidate = 60; // 1 minute

import { getPaginatedproducts } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
}

const CATEGORIES = ["men", "women", "kid"];
const TITLES: Record<Gender, string> = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "Unisex",
};
export default async function CategoryPage({
  params,
  searchParams,
}: Readonly<Props>) {
  const { gender } = params;
  const page = searchParams.page ? +searchParams.page : 1;
  if (!CATEGORIES.includes(gender)) {
    notFound();
  }
  const { products, totalPages } = await getPaginatedproducts({
    page,
    gender,
  });

  return (
    <div className="flex min-h-screen flex-col ">
      <Title title={`Artículos de ${TITLES[gender]}`} className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
