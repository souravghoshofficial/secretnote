import crypto from "crypto";

const KEY_HEX = process.env.SECRET_NOTE_KEY;
if (!KEY_HEX) throw new Error("SECRET_NOTE_KEY missing in env");
const KEY = Buffer.from(KEY_HEX, "hex"); // must be 32 bytes
const ALGO = "aes-256-gcm";

export function encryptMessage(plainText: string) {
  const iv = crypto.randomBytes(12); // recommended 12 bytes
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(plainText, "utf8")),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  };
}

export function decryptMessage(
  ciphertext: string,
  iv: string,
  authTag: string
): string {
  const decipher = crypto.createDecipheriv(
    ALGO,
    KEY,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
