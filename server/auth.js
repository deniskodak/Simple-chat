import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { addUser, getUser } from './db/users.js';
import { config } from 'dotenv';
config();

const secret = Buffer.from(process.env['AUTH_SECRET'], 'base64');

export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret,
});

export const decodeToken = (token) => {
  return jwt.verify(token, secret)
}

export async function handleLogin(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (!user || user.password !== password) {
    res.sendStatus(401);
  } else {
    const token = jwt.sign({ sub: username, id: user.id }, secret);
    res.json({ token });  
  }
}

export async function handleSignup(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);
  if(user) return res.status(409).send('User existed')
  const newUser = await addUser(username, password);
  const token = jwt.sign({ sub: username, id: newUser.id }, secret);
  res.json({ token });
}