export const revalidate = 604800; // 1 week

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { StockLabel } from "../../../../components/product/stock-label/StockLabel";
import { AddtoCart } from "./ui/AddtoCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Readonly<Props>) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  return {
    metadataBase: new URL("https://localhost:3000"),
    title: `${product.title}`,
    description:
      product.description || "Una tienda virtual de productos Tesla.",
    openGraph: {
      title: `${product.title}`,
      description:
        product.description || "Una tienda virtual de productos Tesla.",
      images: [`/products/${product.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Readonly<Props>) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className=" max-w-[1200px] mx-auto mt-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-3 ">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Desktop */}
        <ProductSlideshow
          className="hidden md:block"
          images={product.images}
          title={product.title}
        />
        {/* Mobile */}
        <ProductMobileSlideshow
          className="block md:hidden"
          images={product.images}
          title={product.title}
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} font-bold text-xl antialiased`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* ClientSide */}
        <AddtoCart product={product} />
        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
