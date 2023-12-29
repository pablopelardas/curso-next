"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { addOne, init, substractOne } from "@/store/counter/counterSlice";
import { useEffect } from "react";

interface Props {
  value: number;
}

export interface CounterResponse {
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  return await fetch("/api/counter").then((res) => res.json());
};

export const CartCounter = ({ value }: Readonly<Props>) => {
  const count = useAppSelector((s) => s.counter.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getApiCounter().then((res) => {
      dispatch(init(res.count));
    });
  }, [dispatch]);

  return (
    <>
      <span className="text-9xl">{count}</span>
      <div className="flex">
        <button
          onClick={() => dispatch(addOne())}
          className="flex items-center justify-center p-2 rounder-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2 "
        >
          +1
        </button>
        <button
          onClick={() => dispatch(substractOne())}
          className="flex items-center justify-center p-2 rounder-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2 "
        >
          -1
        </button>
      </div>
    </>
  );
};
