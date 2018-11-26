# Restaurant Reviews Website

Full-stack application built using React and NestJS, which implements the following:

- User can create an account and post reviews for restaurants
- Owner can publish new restaurants and manage their listings
- Owner can reply to user reviews
- Admin can create, edit, and delete users, restaurants, and reviews

## Development

Clone the repository and install the dependencies using `yarn` command.

Application can be started using `docker-compose up` command.

It will expose frontend on `localhost:3000` and backend on `localhost:8080`.

[Multiple seeds](./server/test/seed) can run in development mode by accessing `http://localhost:8080/seed/?seeds=<seed,names>`

## Testing

Both [client](./client) and [server](./server) contain a set of integration tests. 

Instructions on running them are provided in their respective READMEs.

## Deployment

Application expects following environment variables to be set on the server hosting the backend:

- `DATABASE_URL`: Connection string to PostgreSQL database.
- `REDIS_URL`: Connection string to Redis data store.
- `JWT_SECRET`: A random string, like a secure password

Environment variable `REACT_APP_API_URL` must be set during client compilation step to the server URL without the trailing slash.
