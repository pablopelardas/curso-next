'use client'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions} from "@paypal/paypal-js"
import React from 'react'
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props{
  orderId: string;
  amount: number;
}

export const PayPalButton = ({orderId, amount}: Props) => {
  const [{isPending}] = usePayPalScriptReducer();
  if (isPending) return <div className='animate-pulse mb-16'>
    <div className='h-11 bg-gray-300 rounded'></div>
    <div className='h-11 bg-gray-300 rounded mt-4'></div>
  </div>

  const roundedAmount = Math.round(amount * 100) / 100


  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units:[
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount.toString(),
            currency_code: 'USD'
          }
        }
      ]
    })

    const response = await setTransactionId(orderId,transactionId)
    if (!response.ok) {
      console.log(response.message)
      throw new Error('No se pudo actualizar la orden')
    }
    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if (!details) return

    await paypalCheckPayment(details.id!)
  }


  return (
    <div className='relative z-0'>
      <PayPalButtons 
        createOrder={createOrder}
        onApprove={onApprove}
      />
      </div>
  )
}
