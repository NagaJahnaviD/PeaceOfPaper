import CryptoJS from "crypto-js";

const SALT = "whitecat-salt";

export function deriveKey(passphrase) {
  const key = CryptoJS.PBKDF2(passphrase, SALT, {
    keySize: 256 / 32,
    iterations: 1000,
  });
  return key.toString(); // Return key as a hex string
}

// ✅ Convert hex string to WordArray BEFORE encrypting
export function encryptText(text, hexKey) {
  const key = CryptoJS.enc.Hex.parse(hexKey); // ✅ KEY PARSED TO WordArray
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Hex.parse("00000000000000000000000000000000"), // ✅ fixed IV
  });
  return encrypted.toString();
}

// ✅ Same for decryption
export function decryptText(cipher, hexKey) {
  try {
    const key = CryptoJS.enc.Hex.parse(hexKey);
    const decrypted = CryptoJS.AES.decrypt(cipher, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Hex.parse("00000000000000000000000000000000"), // ✅ same fixed IV
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) throw new Error("Invalid decryption output");
    return result;
  } catch (err) {
    console.error("Decryption error:", err);
    throw new Error("Failed to decrypt — possibly wrong passphrase?");
  }
}
