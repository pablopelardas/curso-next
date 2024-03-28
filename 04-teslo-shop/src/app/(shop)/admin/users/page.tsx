// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginatedOrders, getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function UsersPage({ searchParams }: Readonly<Props>) {
  const page = searchParams.page ? +searchParams.page : 1;

  const {users, totalPages, ok} = await getPaginatedUsers({
    page,
    take: 10
  });
  if (!ok) {
    redirect("/auth/login")
  }
  console.log(users)

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users!} />
        <Pagination totalPages={totalPages!} />
      </div>
    </>
  );
}
