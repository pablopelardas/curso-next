// [1,2,3,4,5,...,10]
export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // Si el numero total es de 7 pagiinas o menos mostrmaos todo sin ...
  if (totalPages <= 7) {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }
  // Si la pagina actual entre las primeras 3 mostrar las primeras 3, puntos, ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, "...", totalPages - 1, totalPages];
  }
  // Si la pagina actual esta entre las ultimas 3 paginas mostrar las primeras 2, puntos, ultimas 3
  if (currentPage > totalPages - 3) {
    return [
      1,
      2,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // Si la pagina actual esta en otro lugar medio, mostrar primera pagina, pagina actual y vecinos
  return [
    1,
    2,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages - 1,
    totalPages,
  ];
};
