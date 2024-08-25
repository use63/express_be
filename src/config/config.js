import dot from "dotenv";

dot.config();

// Kunci rahasia dari variabel lingkungan
export const SECRET_KEY = process.env.SECRET_KEY || "secret key!";
export const SSL = process.env.SSL === "true";
export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 3000;
export const STATIC_SALT_CSRF = process.env.STATIC_SALT_CSRF || "some key";