'use client'

import { useEffect, useState } from "react"
import clsx from "clsx"
import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useRouter } from "next/navigation"

export const PlaceOrder = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  const address = useAddressStore((state) => state.address)
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const { subTotal, total, tax, itemsInCart } = useCartStore((state) =>
  state.getSummary()
);


  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)
    const productsToOrder = cart.map(product => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size
    }))
    const {order, ok ,message} = await placeOrder(productsToOrder, address)
    if (!ok) {
      setIsPlacingOrder(false)
      setErrorMessage(message)
      return
    } 
    // clear cart
    clearCart();
    // redirect to order page
    router.replace(`/orders/${order!.id}`)

  }

  if (!loaded) {
    return <div className="flex justify-center items-center">Loading ...</div>
  }
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
        {itemsInCart} {`artículo${itemsInCart !== 1 ? "s" : ""}`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
    <div className="mt-5 mb-2 w-full">
      <p className="mb-5">
        {/* Disclaimer */}
        <span className="text-xs">
          Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
          <a href="/" className="underline">
            términos y condiciones de uso
          </a>
        </span>
      </p>
      {
        errorMessage && !isPlacingOrder && <p className="text-red-500 mb-2">{errorMessage}</p>
      }
      <button
        className={
          clsx("flex w-full justify-center",{
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })
        }
        onClick={onPlaceOrder}
        // href="/orders/123"
      >
        Colocar orden
      </button>
    </div>
  </div>
)
}
