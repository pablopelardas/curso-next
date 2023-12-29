"use client";

import { useAppSelector } from "@/store";
import { SimpleWidget } from "..";

export const WidgetGrid = () => {
  const count = useAppSelector((state) => state.counter.count);
  return (
    <div className="flex flex-wrap p-2 items-center justify-center">
      <SimpleWidget
        label="Contador"
        title={`${count}`}
        subtitle="Items"
        href="/dashboard/counter"
      />
    </div>
  );
};
