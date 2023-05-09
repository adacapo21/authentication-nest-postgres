## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### You can find the tutorial for this project here:

[Implementing Secure User Authentication with NestJS and Postgres: A Step-by-Step Guide](https://medium.com/@0xAggelos/implementing-secure-user-authentication-with-nestjs-and-postgres-a-step-by-step-guide-950e5469f62a) 

## Installation

```bash
$ npm install
```
Before you run the app, you need to create a Postgres database. 

Then, you need to fill **the database.env file** in the config directory of the project and add the environment variables which exist in **the database.env.example file**.

Next step to run the app.

```bash
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
When your app is running, endpoints will be available at:
```
http://localhost:3000/users/register
http://localhost:3000/users/login
```
## License

Nest is [MIT licensed](LICENSE).
