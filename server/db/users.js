import { connection } from './connection.js';
import { generateId } from './ids.js';

const getUserTable = () => connection.table('user');

export async function getUser(username) {
  return await getUserTable().first().where({ username });
}

export async function addUser(username, password) {
  const id = generateId();
  await getUserTable().insert({ username, password, id })
  return { username, password, id }
}

export async function getUsers() {
  return await getUserTable().select();
}