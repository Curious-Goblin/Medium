# Blogging Website

This Blogging Website is a platform that allows users to create, edit, and share blog posts. Users can sign up, sign in, and interact with the content through a user-friendly interface.

## Features

- **User Authentication**: Users can sign up and sign in securely to access their accounts.
- **Create and Edit Posts**: Users can create new blog posts and edit existing ones.
- **View Posts**: Users can view all blog posts and read individual posts in detail.
- **User Dashboard**: Users can view their profile and manage their posts.

## Getting Started

To get started with the Blogging Website, follow these steps:


1. Clone this repository to your local machine.
2. Ensure you have npm installed on your machine and have an account on the [Cloudflare Workers](https://workers.cloudflare.com).
3. Install the necessary dependencies by running `npm install`.
4. Get your PostgreSQL connection URL from [Neon](https://neon.tech) and connection pool URL from [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate).
5. Change the `DATABASE_URL` in `backend/wrangler.toml` file with your `Prisma Accelerate URL`.
6. Replace the `PostgreSQL connection URL` in `backend/.env` file.
7. Navigate to the `backend` folder and run `npm run dev` to start the backend server.
8. Replace the `BACKEND_URL` in `frontend/src/config.ts` file.
9. Navigate to the `frontend` folder and run `npm run dev` to start the frontend server.
10. Access the application through the link generated after starting the frontend server.

## Technologies Used

- **[Cloudflare Workers](https://workers.cloudflare.com/)**: Backend server environment.
- **[Hono](https://honojs.dev/)**: Web framework for Cloudflare Workers to simplify backend development.
- **[Zod](https://zod.dev/)**: Input validation library.
- **[PostgreSQL](https://www.postgresql.org/)**: Database for storing user information and blog data.
- **[Prisma](https://www.prisma.io/)**: ORM library for interacting with PostgreSQL.
- **[TypeScript](https://www.typescriptlang.org/)**: Provides type safety for both frontend and backend code.
- **[React](https://reactjs.org/)**: Frontend library for building user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.

## Acknowledgements

Special thanks to the developers of Cloudflare Workers, Hono, Zod, PostgreSQL, Prisma, TypeScript, React, Tailwind CSS, and other open-source technologies used in this project.
