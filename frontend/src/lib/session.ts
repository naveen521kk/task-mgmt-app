// store access token in cookies
export function setAccessToken(token: string) {
  document.cookie = `access_token=${token}; path=/`;
}

export function getAccessToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
}
