import { OrderStatus, PayPalButton } from "@/components"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

interface Props{
  order: any,
  address: any,
}

export const OrderSummary = ({order, address}: Props) => {
  
  return(
  <div className="bg-white rounded-xl shadow-xl p-7">
    <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
    <div className="mb-10">
      <p className="text-xl">{address.firstName} {address.lastName}</p>
      <p>{address.address}</p>
      <p>{address.address2}</p>
      <p>{address.zip}</p>
      <p>{address.city}, {address.country}</p>
      <p>{address.phone}</p>
    </div>

    <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

    <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
    <div className="grid grid-cols-2">
    <span>No. Productos</span>
      <span className="text-right">
        {order.itemsInOrder} {`artículo${order.itemsInOrder !== 1 ? "s" : ""}`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(order.subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(order.tax)}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(order.total)}</span>
    </div>
    <div className="mt-5 mb-2 w-full">
      {
        order.paidAt ? (
          <OrderStatus isPaid={true} />
        ) : (
          <PayPalButton 
          amount={order.total}
          orderId={order.id}
        />
        )
      }

    </div>
  </div>
)
}
