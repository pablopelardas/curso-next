import { Product, products } from "@/products/data/products";
import { Cart, ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";
import { Widget } from "../../../components/Widget/Widget";

export const metadata = {
  title: "Shopping Cart",
  description: "Shopping Cart",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: Cart): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];
  for (const id in cart) {
    const quantity = cart[id];
    const product = products.find((product) => product.id === id);
    if (product) {
      productsInCart.push({ product, quantity });
    }
  }
  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as Cart;
  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mt-1 mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard product={product} quantity={quantity} key={product.id} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <Widget title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.15).toFixed(2)}{" "}
              </h3>
            </div>
            <span className="block font-bold text-center text-gray-500">
              Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </Widget>
        </div>
      </div>
    </div>
  );
}
