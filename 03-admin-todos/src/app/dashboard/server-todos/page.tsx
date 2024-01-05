import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de Todos",
  description: "Listado de Todos",
};

export const dynamic = "force-dynamic";
export const revalidate = "0";

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();
  if (!user) redirect("/api/auth/signin");
  const todos = await prisma.todo.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      description: "asc",
    },
  });
  return (
    <>
      <span className="text-3xl inline-block mb-5">Server Actions</span>
      <div>
        <div className="w-full px-3 mx-5 mb-5">
          <NewTodo />
        </div>
        <TodosGrid todos={todos} />
      </div>
    </>
  );
}
