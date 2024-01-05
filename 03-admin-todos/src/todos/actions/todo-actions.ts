"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(2000);
  const todo = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });
  if (!todo) throw new Error(`Todo with id ${id} not found`);
  const updatedTodo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: completed,
    },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (
  description: string,
  userId: string
): Promise<Todo | { message: string }> => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        userId,
      },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creating todo",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true,
      },
    });
    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    console.log(error);
  }
};
