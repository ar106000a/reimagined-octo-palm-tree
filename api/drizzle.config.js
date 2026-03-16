/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./drizzle/schema/*.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql", // Change from 'driver' to 'dialect' (required in recent versions)
  dbCredentials: {
    host: "localhost", // Docker host
    port: 5432, // Default PG port
    user: "user", // From docker-compose
    password: "password", // From docker-compose
    database: "salon_db", // From docker-compose
    ssl: false,
  },
  verbose: true,
};
