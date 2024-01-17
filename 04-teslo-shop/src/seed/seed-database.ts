import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  await Promise.all([
    await prisma.userAddress.deleteMany({}),
    await prisma.user.deleteMany({}),
    await prisma.productImage.deleteMany({}),
    await prisma.product.deleteMany({}),
    await prisma.category.deleteMany({}),
    await prisma.country.deleteMany({}),
  ]);

  const { categories, products, users, countries } = initialData;

  // Users
  await prisma.user.createMany({
    data: users,
  });

  // Categories
  const categoriesData = categories.map((name) => ({
    //categories capitalize
    name: `${name[0].toUpperCase()}${name.slice(1)}`,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // Products
  const productsData = products.map((product) => {
    const { images, type, ...rest } = product;
    return {
      ...rest,
      categoryId: categoriesMap[type.toLowerCase()],
    };
  });

  await prisma.product.createMany({
    data: productsData,
  });

  // Images
  const productsDB = await prisma.product.findMany();
  const productsMap = productsDB.reduce((map, product) => {
    map[product.title.toLowerCase()] = product.id;
    return map;
  }, {} as Record<string, string>);

  const imagesData = products.map((product) => {
    const { images } = product;
    return images.map((image) => ({
      url: image,
      productId: productsMap[product.title.toLowerCase()],
    }));
  });

  const images = imagesData.flat();

  await prisma.productImage.createMany({
    data: images,
  });

  // Countries
  await prisma.country.createMany({
    data: countries,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
