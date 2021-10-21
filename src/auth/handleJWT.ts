import { authenticationResponse, claim } from "./auth.models";
const tokenKey = "token";
const expirationKey = "token-expiration";
export function saveToken(authData: authenticationResponse) {
  localStorage.setItem(tokenKey, authData.token);
  localStorage.setItem(expirationKey, authData.expiration.toString());
}

export function getClaims(): claim[] {
  const token = localStorage.getItem(tokenKey)!;
  if (!tokenKey) {
    return [];
  }

  const expiration = localStorage.getItem(expirationKey)!;
  const expirationDate = new Date(expiration);
  if (expirationDate <= new Date()) {
    logout(); // the token has expired
    return [];
  }

  const dateToken = JSON.parse(atob(token.split(".")[1]));
  const response: claim[] = [];
  for (const property in dateToken) {
    response.push({ name: property, value: dateToken[property] });
  }
  return response;
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationKey);
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}
