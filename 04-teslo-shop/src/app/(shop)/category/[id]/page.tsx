import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

const CATEGORIES = ["men", "women", "kid"];
const Titles: Record<Category, string> = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "Unisex",
};

const getCategoryProduct = (id: Category) => {
  const products = initialData.products.filter(
    (product) => product.gender === id
  );
  const title = Titles[id];
  return {
    products,
    title,
  };
};

export default function CategoryPage({ params }: Readonly<Props>) {
  const { id } = params;
  if (!CATEGORIES.includes(id)) {
    notFound();
  }
  const { products, title } = getCategoryProduct(id);
  return (
    <div className="flex min-h-screen flex-col ">
      <Title title={`Artículos de ${title}`} className="mb-2" />
      <ProductGrid products={products} />
    </div>
  );
}
