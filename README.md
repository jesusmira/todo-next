
<div style="width: 50%; max-width: 300px;">
    <img src="./public/next.svg" style="width: 100%; height: auto; " />
</div>
<br />


# Development

Pasos para levantar el proyecto en local:

1. Levantar la base de datos de postgres

```
docker-compose up -d
```

2. Renombrar el archivo .env.template a .env
3. Reemplazar las variables de entorno en el archivo .env
4. Ejecutar el comando  ```npm install```
5. Ejecutar el comando  ```npm run dev```
6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```


6. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed) con los datos de ejemplo

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
## Nota: Usuario por defecto
__usuario:__ test1@test.com
__password:__ 12345678

# Ayuda

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs/orm/reference/prisma-cli-reference) - learn about Prisma.
- [Prisma Adapter Authjs](https://authjs.dev/getting-started/adapters/prisma?_gl=1*184q855*_gcl_au*OTExMTg2NjQ1LjE3NDYwMDE1OTMuMjAyODgyMzY4MC4xNzQ2MTc2MDY2LjE3NDYxNzYwNjY.) - learn how to connect your database to Prisma Adapter Authjs.