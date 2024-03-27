
import { CartProduct } from "@/interfaces";
import { currencyFormat } from "@/utils";
import Image from "next/image";


interface Props{
    products: CartProduct[]
}

export const ProductsInOrder = ({products}: Props) => {
  return (
    <>
      {products.map((product) => (
        <div key={`${product.title}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            className="rounded-lg object-fill mr-5"
          />
          <div>
            <span>
              <a href={`/product/${product.slug}`} target="_blank">
                {product.size} - {product.title} ({product.quantity})
              </a>
            </span>
            <p>{currencyFormat(product.price)}</p> 
            <p className="font-bold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
