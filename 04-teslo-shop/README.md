# Descripción

Teslo Shop es un proyecto académico que explora las principales funcionalidades de Next 14, replicando el ecommerce de Tesla. Este proyecto fue realizado siguiendo el curso de Next 14 de Fernando Herrea en DevTalles.

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del `.env.template` y renombrarlo a `.env`, cambiar las variables de entorno.
3. Instalare dependencias con `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Correr el seed de la DB `npm run seed`
7. Correr el proyecto con `npm run dev`

## Correr en prod
