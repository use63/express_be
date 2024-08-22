// Mengimport modul yang dibutuhkan
import express from "express";
import cookieParser from "cookie-parser";
import { logger, validateRegistration, verifyJwtToken } from "./middleware/index.js";
import { post, get } from "./routes/index.js";
import { HOST, PORT } from "./config/config.js"


// Inisialisasi express
const app = express();
 

// Extension Register
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger(`http://${HOST}:${PORT}`));


// Halaman utama
app.get("/", get.home);
// Endpoint cek cookie
app.post("/api/v1/check-cookies", verifyJwtToken, post.checkCookies);
// Endpoint login
app.post("/api/v1/login", post.login)
// Endpoint register
app.post("/api/v1/register", validateRegistration, post.register)
// Endpoint logout
app.post("/api/v1/logout", post.logout);
// Endpoint logger
app.post("/api/v1/logger", post.logger);
// Endpoint create one time token
app.post("/api/v1/create-one-time-token", post.createOneTimeToken)


// Menjalankan server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));