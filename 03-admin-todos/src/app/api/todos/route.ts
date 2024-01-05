import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { boolean, object, string } from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "10");
  if (isNaN(limit)) {
    return NextResponse.json(
      { message: "Limit must be a number" },
      { status: 400 }
    );
  }
  const offset = parseInt(searchParams.get("offset") ?? "0");
  if (isNaN(offset)) {
    return NextResponse.json(
      { message: "Offset must be a number" },
      { status: 400 }
    );
  }
  const todos = await prisma.todo.findMany({
    take: limit,
    skip: offset,
  });
  return NextResponse.json(todos);
}

const postSchema = object({
  description: string().required(),
  completed: boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const user = await getUserSessionServer();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { description, completed } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({
      data: {
        description,
        completed,
        userId: user.id,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

/**
 * Delete all completed todos
 */
export async function DELETE(req: Request) {
  try {
    const user = await getUserSessionServer();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await prisma.todo.deleteMany({
      where: {
        completed: true,
        userId: user.id,
      },
    });
    return NextResponse.json({ message: "Deleted all completed todos" });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
