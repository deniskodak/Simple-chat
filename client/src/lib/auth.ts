import jwtDecode from 'jwt-decode';
import { JWTClaims } from './types';

const ACCESS_TOKEN_KEY = 'accessToken';
const API_URL = 'https://chat-graphql-0b20.onrender.com';

export function getAccessToken(): string {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getUser(): string | null {
  const token: string = getAccessToken();
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
}

export async function auth(username: string, password: string, isSignUp): Promise<string | null> {
  const authPath = isSignUp ? "signup" : 'login';
  const response = await fetch(`${API_URL}/${authPath}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return username;
  }
  throw new Error(response.statusText);
}

export function logout(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function getUserFromToken(token): string {
  const jwtPayload: JWTClaims = jwtDecode(token);
  return jwtPayload.sub;
}
