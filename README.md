# Ye Olde Shoppe

This respository contains a Gatsby app and Express API that will let you spin up a sample shop website in minutes.

The `main` branch is a base setup, that provides some default data in the API, and unauthenticated endpoints to create, read, update, and delete items.

## Installation

After cloning this respository, you'll need to open two terminal windows - one for the frontend, another for the API.

### Starting the frontend

```
cd frontend
npm i
cp .env.example .env.development
gatsby develop
```

### Starting the API

```
cd api
npm i
cp .env.example .env
npm run dev
```

You can now launch the Gatsby app at http://localhost:8000/.
