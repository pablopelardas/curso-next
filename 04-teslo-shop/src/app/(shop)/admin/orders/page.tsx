// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginatedOrders } from "@/actions";
import { Title } from "@/components";
import { OrderRow } from "./ui/OrderRow";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const {orders, ok} = await getPaginatedOrders({});
  if (!ok) {
    redirect("/auth/login")
  }
  console.log(orders)

  return (
    <>
      <Title title="Todas las Ordenes" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
