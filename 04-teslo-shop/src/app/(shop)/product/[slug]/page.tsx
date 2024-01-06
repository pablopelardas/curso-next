import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

const getProduct = (slug: string) =>
  initialData.products.find((product) => product.slug === slug);

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-3 ">
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
        <h1 className={`${titleFont.className} font-bold text-xl antialiased`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* Selector tallas */}
        <SizeSelector sizes={product.sizes} selectedSize={product.sizes[0]} />
        {/* Selector cantidad */}
        <QuantitySelector quantity={3} />
        {/* Boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>
        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
