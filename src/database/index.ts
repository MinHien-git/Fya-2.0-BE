import { Pool, QueryArrayConfig } from "pg";
import { poolConfig } from "../configs/database.config";
const pool = new Pool(poolConfig);

export default pool;
