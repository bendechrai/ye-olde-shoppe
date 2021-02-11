# Ye Olde Shoppe

This respository contains a Gatsby app and Express API that will let you spin up a sample shop website in minutes.

This `rbac` branch builds on the `auth` branch, and includes code to limit certain actions to certain roles.

As part of this setup, we're going to create two roles:

- Editor (can add and update items)
- Admin (can delete items)

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

## Setting up Auth0 for Authentication

1. Create a new [Application](https://manage.auth0.com/#/applications) of type "Single Page App". The name doesn't matter.
   - In the "Settings" tab, scroll down to "RBAC Settings", and:
     - set **Allowed Callback URLs** to `http://localhost:8000`
     - set **Allowed Logout URLs** to `http://localhost:8000`
     - set **Allowed Web Origins** to `http://localhost:8000`
     - scroll to the bottom and hit "SAVE CHANGES"
   - Scroll to the top and copy the **Domain** and **Client ID** to:
     - **GATSBY_AUTH0_DOMAIN** and **GATSBY_AUTH0_CLIENT_ID** in `frontend/.env.development`
     - **AUTH0_ISSUER** in `api/.env` (making sure it's still in the format "https://URL/")
1. Create a new [API](https://manage.auth0.com/#/apis) with the identifier "http://localhost:7000". The name doesn't matter.

## Setting up Auth0 for Role Based Access Control (RBAC)

1. Click on the [API](https://manage.auth0.com/#/apis) you just created
   - In the "Settings" tab, scroll down to "RBAC Settings", and:
     - enable **Enable RBAC**
     - enable **Add Permissions in the Access Token**
     - scroll to the bottom and hit "SAVE CHANGES"
   - In the "Permissions" tab, create three permissions with a description of your choice, and the following scopes:
     - create:items
     - update:items
     - delete:items
1. In "Users & Roles" > "[Roles](https://manage.auth0.com/#/roles)", create two new Roles with the names:
   - Editor
     - Add `create:items`, and `update:items` permissions to this role
   - Admin
     - Add `create:items`, `update:items`, and `delete:items` permissions to this role
1. In "Users & Roles" > "[Users](https://manage.auth0.com/#/users)", edit one of the users you've created, and in the "Roles" tab for that user, click "ASSIGN ROLES".
   - Select one of the roles, click "ASSIGN",

## Launch

You can now launch the Gatsby app at http://localhost:8000/.

Once you've logged in, play with the admin area and see what happens if you don't have permissions.

To try different permission levels out, add and remove roles for your user, remembering to log out and back in again to update the access token.

What happens if your user has no roles assigned?
