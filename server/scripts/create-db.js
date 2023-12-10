import { connection } from '../db/connection.js';
import { generateId } from '../db/ids.js';

await connection.schema.dropTableIfExists('user');
await connection.schema.dropTableIfExists('message');

await connection.schema.createTable('user', (table) => {
  table.text('username').notNullable().primary();
  table.text('password').notNullable();
  table.text('id').notNullable();
});

await connection.schema.createTable('message', (table) => {
  table.text('id').notNullable().primary();
  table.text('userId').notNullable();
  table.text('chatId').notNullable();
  table.text('text').notNullable();
  table.text('createdAt').notNullable();
});

await connection.table('user').insert([
  {
    username: 'Bot',
    password: 'bot12345',
    id: generateId()
  },
]);

process.exit();
