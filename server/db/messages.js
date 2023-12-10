import { connection } from './connection.js';
import { generateId } from './ids.js';

const getMessageTable = () => connection.table('message');

export async function getMessages(chatId) {
  const reversedChatId = chatId.split('-').reverse().join('-');

  return await getMessageTable()
    .select()
    .where({ chatId })
    .orWhere({ chatId: reversedChatId })
    .orderBy('createdAt', 'asc');
}

export async function createMessage(userId, text, chatId) {
  const message = {
    id: generateId(),
    userId,
    chatId,
    text,
    createdAt: new Date().toISOString(),
  };
  await getMessageTable().insert(message);
  return message;
}

export async function cleanupMessages() {
  await connection.table('message').truncate();
}