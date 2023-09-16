import Cookies from "js-cookie";
import { KJUR, RSAKey } from "jsrsasign"; // Importa las funciones necesarias

// Clave pública RSA para encriptar y desencriptar
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6dY7YAjUZWqBzXz0Atpy
JezZMZwOKzSsxx4OcJ8z/7USU5zCts58U+te3NqglshDOK2lVJX7KkVzLhzl57m
6SHTQn8PlbyIyGry+KSDmX88dC4SEhK0LWfEMsw6lnRTWpyk0Mm8eVm/LzEHjFa
+NJr0F/5XXeyRqVl3D6XLSB6XlP68uK8VLHFRycmGc0TfE9jKH3hqWYjTH0eU7x
7Ph6yLxkw+qWrr3fJLdbACR1wMm3Z6Y9VNtxxvGS26MqK5k4E1rKyPKct0a6chB
cyf4G3NRH4FayEO1XENQtzX+waXOt5YeRzxjUI62QZiizEpgtZ0TbG8K+1qoQqI
+wIDAQAB
-----END PUBLIC KEY-----`;

// Función para encriptar el email
const encryptEmail = (email) => {
  try {
    const rsa = new RSAKey();
    rsa.readPrivateKeyFromPEMString(publicKey);
    const encryptedEmail = KJUR.crypto.Cipher.encrypt("RSA", rsa, email);
    return btoa(encryptedEmail);
  } catch (error) {
    console.error("Error al encriptar el email:", error);
    return null;
  }
};

// Función para desencriptar el email (en caso necesario)
const decryptEmail = (encryptedEmail) => {
  try {
    const rsa = new RSAKey();
    rsa.readPrivateKeyFromPEMString(publicKey);
    const decryptedEmail = KJUR.crypto.Cipher.decrypt(
      "RSA",
      rsa,
      atob(encryptedEmail)
    );
    return decryptedEmail;
  } catch (error) {
    console.error("Error al desencriptar el email:", error);
    return null;
  }
};

export { encryptEmail, decryptEmail };
