export function safeBase64Encode(joinedData: {
  owner: string;
  ident: string;
  descr: string;
}): string {
  const jsonData = JSON.stringify(joinedData);
  return btoa(jsonData);
}

export function safeBase64Decode(encodedData: string): {
  owner: string;
  ident: string;
  descr: string;
} {
  const jsonData = atob(encodedData);
  return JSON.parse(jsonData);
}
