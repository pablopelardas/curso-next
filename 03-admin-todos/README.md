# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Crear una copia del el .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar `npm install`
5. Ejecutar `npm run dev`
6. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

## Nota:

**usuario**: test1@google.com
**password**: 123456

7. Ejecutar estos comandos de prisma

```
npx prisma migrate dev
npx prisma generate
```

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage
