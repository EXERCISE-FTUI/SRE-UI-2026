import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL ?? process.env.DB_URL;

if (!databaseUrl) {
	throw new Error("Missing DATABASE_URL environment variable");
}

declare global {
	var _neonSql: ReturnType<typeof neon> | undefined;
}

export const sql = globalThis._neonSql ?? neon(databaseUrl);

if (process.env.NODE_ENV !== "production") {
	globalThis._neonSql = sql;
}