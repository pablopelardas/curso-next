import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  sizes: Size[];
  selectedSize: Size;
}

export const SizeSelector = ({ selectedSize, sizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {sizes.map((size) => (
          <button
            className={clsx("mx-2 hover:underline text-sm font-bold", {
              underline: size === selectedSize,
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
