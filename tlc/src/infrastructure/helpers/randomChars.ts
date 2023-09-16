export function generateRandomString() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
