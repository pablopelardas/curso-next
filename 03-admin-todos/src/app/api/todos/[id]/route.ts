import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import { boolean, object, string } from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();
  if (!user) {
    return null;
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (todo?.userId !== user.id) {
    return null;
  }
  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = getTodo(params.id);
  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id: ${id} doesn't exists` },
      { status: 404 }
    );
  }
  return NextResponse.json(todo);
}

const putSchema = object({
  description: string().optional(),
  completed: boolean().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
  const { id } = params;
  const todo = getTodo(params.id);
  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id: ${id} doesn't exists` },
      { status: 404 }
    );
  }
  try {
    const { description, completed } = await putSchema.validate(
      await req.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        description,
        completed,
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
