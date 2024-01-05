import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          {
            description: "Buy milk",
          },
          {
            description: "Buy eggs",
          },
          {
            description: "Buy bread",
          },
          {
            description: "Buy butter",
            completed: true,
          },
        ],
      },
    },
  });

  return NextResponse.json({ message: "Seed executed" });
}
