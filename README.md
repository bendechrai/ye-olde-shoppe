# Ye Olde Shoppe

This respository contains a Gatsby app and Express API that will let you spin up a sample shop website in minutes.

This `auth` branch builds on the `main` branch, and includes code to require authentication for the administrative tasks.

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

## Setting up Auth0

1. Create a new [Application](https://manage.auth0.com/#/applications) of type "Single Page App". The name doesn't matter.
1. Set **Allowed Callback URLs** to `http://localhost:8000`
1. Set **Allowed Logout URLs** to `http://localhost:8000`
1. Set **Allowed Web Origins** to `http://localhost:8000`
1. Scroll to the bottom and hit "SAVE CHANGES"
1. Scroll to the top and copy the **Domain** and **Client ID** to:
   - **GATSBY_AUTH0_DOMAIN** and **GATSBY_AUTH0_CLIENT_ID** in `frontend/.env.development`
   - **AUTH0_ISSUER** in `api/.env` (making sure it's still in the format "https://URL/")
1. Create a new [API](https://manage.auth0.com/#/apis) with the identifier "http://localhost:7000". The name doesn't matter.

## Launch

You can now launch the Gatsby app at http://localhost:8000/.
