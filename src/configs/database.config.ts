import { PoolConfig } from "pg";

export const poolConfig: PoolConfig = {
  user: "postgres",
  host: "localhost",
  database: "Fya",
  password: "123456" || process.env.PASSWORD,
  port: 5432,
};
