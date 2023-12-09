import { connection } from '../db/connection.js';

await connection.table('message').truncate();

process.exit();
