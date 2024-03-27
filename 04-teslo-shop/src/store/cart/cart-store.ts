import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getSummary: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}

const isSameProduct = (product: CartProduct, otherProduct: CartProduct) =>
  product.id === otherProduct.id && product.size === otherProduct.size;

const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        console.log(cart);

        // 1. Check if product with same size is already in cart
        const productInCart = cart.some((p) => isSameProduct(p, product));
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // 2. If product is already in cart, update quantity
        const updatedCart = cart.map((p) => {
          if (isSameProduct(p, product)) {
            return { ...p, quantity: p.quantity + product.quantity };
          }
          return p;
        });
        set({ cart: updatedCart });
      },
      getSummary: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);
        return { subTotal, tax, total, itemsInCart };
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCart = cart.map((p) => {
          if (isSameProduct(p, product)) {
            return { ...p, quantity };
          }
          return p;
        });
        set({ cart: updatedCart });
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        const updatedCart = cart.filter((p) => !isSameProduct(p, product));
        set({ cart: updatedCart });
      },
      clearCart: () => {
        set({ cart: [] });
      }
    }),
    {
      name: "shopping-cart",
    }
  )
);

export { useCartStore };
