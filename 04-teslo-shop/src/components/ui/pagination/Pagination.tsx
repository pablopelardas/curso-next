"use client";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from "@/utils/index";
import clsx from "clsx";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1) redirect(pathname);

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") return `${pathname}?${params.toString}`;
    if (+pageNumber <= 0) return `${pathname}`;
    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`;
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mb-32 mt-10">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((pageNumber) => (
            <li className="page-item" key={pageNumber}>
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded  focus:shadow-none",
                  {
                    "bg-blue-600 shadow-md text-white hover:bg-blue-700":
                      currentPage === pageNumber,
                    "text-gray-800 hover:text-gray-800 hover:bg-gray-200":
                      currentPage !== pageNumber,
                  }
                )}
                href={createPageUrl(pageNumber)}
              >
                {pageNumber}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
