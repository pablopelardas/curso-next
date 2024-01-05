"use client";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { addTodo, deleteCompleted } from "../actions/todo-actions";
import { createTodo } from "../helpers/todos";
import { useRouter } from "next/navigation";
export const NewTodo = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (description.trim() === "") return;
    // await addTodo(description, );
    await createTodo(description);
    router.refresh();
    setDescription("");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(event) => setDescription(event.target.value)}
        type="text"
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all gap-2"
      >
        <IoTrashOutline />
        Borrar completados
      </button>
    </form>
  );
};
