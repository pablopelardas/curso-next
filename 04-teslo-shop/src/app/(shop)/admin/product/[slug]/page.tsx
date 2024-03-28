import { getProductBySlug,getCategories } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props{
    params: {
        slug: string;
    };
}

export default async function ProductPage({params}: Props) {
    const {slug} = params
    const [product, {categories, ok}] = await Promise.all([getProductBySlug(slug), getCategories()]);
    if ((!product || !ok) && slug !== 'new') redirect("/admin/products");
    const title = (slug === "new") ? "Nuevo producto" : "Editar producto";
  return (
    <>
        <Title title={title} />
        <ProductForm product={product ?? {}} categories={categories!} />
    </>
  );
}