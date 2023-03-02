import pg from "pg";
import "dotenv/config";

export const pool = new pg.Pool({
  user: process.env.USER_PSQL,
  host: process.env.HOST_PSQL,
  database: process.env.DB_PSQL,
  password: process.env.PASSWORD_PSQL,
  port: 5432,
});
