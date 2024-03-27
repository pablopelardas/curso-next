import { getOrderById } from "@/actions";
import { OrderStatus, Title } from "@/components";
import { CartProduct } from "@/interfaces";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { ProductsInOrder } from "./ui/ProductsInOrder";
import { OrderSummary } from "./ui/OrderSummary";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;
  const {data, ok} = await getOrderById(id)
  console.log(data)
  if (!data || !ok){
    redirect('/')
  }
  if (!data.OrderItem.length){
    return <div>Orden vacía</div>
  }
  const { OrderAddress, OrderItem, ...order } = data
  if (!OrderAddress){
    return <div>Orden sin dirección</div>
  }
  const {country, ...restAddress} = OrderAddress
  const orderSummary = {
    address: {
      ...restAddress,
      country: country.name
    },
    order
  }

  const products : CartProduct[] = data.OrderItem.map((item) => {
    return {
      id: item.product.id,
      title: item.product.title,
      price: item.price,
      image: item.product.ProductImage[0].url,
      slug: item.product.slug,
      size: item.size,
      quantity: item.quantity
    }
  })
  
  //todo: verificar si la orden existe y si es del usuario

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Orden ${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={!!order.paidAt} />
            <ProductsInOrder products={products} />
          </div>

          {/* Checkout */}
            <OrderSummary order={orderSummary.order} address={orderSummary.address} />
          </div>
        </div>
      </div>
  );
}
