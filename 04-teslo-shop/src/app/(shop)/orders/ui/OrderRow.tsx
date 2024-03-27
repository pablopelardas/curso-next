import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    order: {
        id: string;
        fullName: string;
        isPaid: boolean;
    }
}

export const OrderRow = ({order}: Props) => {
    //console log date
    console.log(Date.prototype.toISOString.call(new Date()))
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        ...{order.id.split("-").at(-1)}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {order.fullName}
        </td>
        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {
            !order.isPaid ? <IoCardOutline className="text-red-800" /> :  <IoCardOutline className="text-green-800" />
        }
        {
            !order.isPaid ? <span className="mx-2 text-red-800">No Pagada</span> : <span className="mx-2 text-green-800">Pagada</span>
        }
       
        </td>
        <td className="text-sm text-gray-900 font-light px-6 ">
        <Link href={`/orders/${order.id}`} className="hover:underline">
            Ver orden
        </Link>
        </td>
    </tr>
  )
}
