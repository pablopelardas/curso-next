import { Todo } from "@prisma/client";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  const body = { completed };
  const todo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  console.log(todo);
  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };
  const todo = await fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return todo;
};

export const deleteCompletedTodos = async (): Promise<void> => {
  try {
    await fetch(`/api/todos`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
};
