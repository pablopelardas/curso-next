"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

import { useState } from "react";

interface Props {
  product: Product;
}

export const AddtoCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const onQuantityChanged = (value: number) => {
    if (quantity + value < 1 || quantity + value > 5) return;
    setQuantity(quantity + value);
  };

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      image: product.images[0].url,
      price: product.price,
      title: product.title,
      size,
      quantity,
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      {posted && !size && (
        <span className="text-red-500 fade-in">
          Debe de seleccionar una talla
        </span>
      )}
      {/* Selector tallas */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={size}
        onSelectSize={setSize}
      />
      {/* Selector cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={onQuantityChanged}
      />
      {/* Boton */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
