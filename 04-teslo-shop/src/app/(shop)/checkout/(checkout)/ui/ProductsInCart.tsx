"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!productsInCart.length) {
      router.replace("/empty");
    }
    setLoaded(true);
  }, [productsInCart.length, router]);

  if (!loaded) {
    return <div className="flex justify-center items-center">Loading ...</div>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
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
              <p>
                {product.size} - {product.title} ({product.quantity})
              </p>
            </span>
            <p>{currencyFormat(product.price)}</p> 
            <p className="font-bold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
