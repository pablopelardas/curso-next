"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getStockBySlug(slug).then((stock) => {
      setStock(stock);
      setIsLoading(false);
    });
  }, [slug]);
  return !isLoading ? (
    <h1 className={`${titleFont.className} font-bold text-sm antialiased`}>
      Stock: {stock}
    </h1>
  ) : (
    <h1
      className={`${titleFont.className} font-bold text-sm antialiased bg-gray-200 animate-pulse`}
    >
      &nbsp;
    </h1>
  );
};
