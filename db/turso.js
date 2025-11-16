import dotenv from "dotenv";
import { createClient } from "@libsql/client";

dotenv.config();

async function openDbConnection() {
	return createClient({
		url: process.env.TURSO_DB,
		authToken: process.env.TURSO_TOKEN,
	});
}

export async function executeQuery(query, params = []) {
	const conection = await openDbConnection();

	const result = await conection.execute(query, params);
	conection.close();

	const isSelect = query.trim().toUpperCase().startsWith("SELECT");
	return isSelect ? result.rows : result;
}
