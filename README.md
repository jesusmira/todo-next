# Development

Pasos para levantar el proyecto en local:

1. Levantar la base de datos de postgres

```
docker-compose up -d
```

2. Renombrar el archivo .env.template a .env
3. Reemplazar las variables de entorno en el archivo .env
4. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed) con los datos de ejemplo

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

Cambiar usuario, password y nombre de la base de datos en el archivo .env

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
