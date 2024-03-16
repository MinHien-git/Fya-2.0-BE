import { Secret } from "jsonwebtoken";

export const ACCESS_TOKEN: Secret = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN: Secret = process.env.REFRESH_TOKEN_SECRET!;
