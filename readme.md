> ai generated (i'm lazy) and modified by me

# Zenstack Monorepo Template

This is a monorepo template using ZenStack for the backend and React for the frontend.

## Structure

The repository is structured as follows:

- `packages/backend`: This is where the backend code resides. It uses ZenStack, a modern full-stack framework.
- `packages/frontend`: This is where the frontend code resides. It uses React, a popular JavaScript library for building
  user interfaces.
- `packages/shared`: This is where the shared code between the frontend and backend resides.

## Getting Started

To get started with this project, follow these steps:

1. `pnpm install`
2. `pnpm init` (works smoothly only on linux. on windows you would need to do some step manually)
    - would setup local db postgres db via docker (means pull pg image for you if not exists)
    - would generate prisma client models.
    - would push the correct schema to the db and would run initial migration (`seed.ts`).
    - would stop the local db
4. configure .env file with your github sso oauth app. [see Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
   - `cp packages/backend/.env.example packages/backend/.env`
   - update your .env file accordingly
     - `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` should be taken from you github sso
     - `AUTH_SECRET` should be some random string, you can use `openssl rand -hex 32` to generate one.
     - `DATABASE_URL` can be left as is if you are using the default docker-compose setup.
5. `pnpm run dev` to start the backend+frontend servers+db with docker. 
   RUNS BEST ON LINUX! 'concurrently' sucks on windows.  if got any issues, run the 'dev' script on backend and frontend separately.
6. Note: only admins are allowed to update Products and their status.
   - login with github sso.
   - run `pnpm run studio` on the backend directory to interact with the db directly.
   - update the role of your user to 'Admin' so could create and delete products
