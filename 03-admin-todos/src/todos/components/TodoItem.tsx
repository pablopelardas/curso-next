"use client";
import { startTransition, useOptimistic } from "react";
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => {
      return {
        ...state,
        completed: newCompleteValue,
      };
    }
  );
  const onToggleTodo = async () => {
    try {
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.completed);
      });
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed);
    } catch (error) {
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.completed);
      });
    }
  };
  return (
    <div
      className={
        todoOptimistic.completed ? styles.todoDone : styles.todoPending
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <button
          onClick={() => onToggleTodo()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onToggleTodo();
          }}
          tabIndex={0}
          className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          ${todoOptimistic.completed ? "text-blue-500" : "text-red-500"}
        `}
        >
          {todoOptimistic.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </button>
        <div className="text-center sm:text-left ">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
