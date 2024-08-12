// Mengimport modul yang dibutuhkan
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { setCookie } from "./utils/index.js";
import { logger, validateRegistration } from "./middleware/index.js";
import CryptoJS from "crypto-js";

// Konfigurasi dotenv
dotenv.config();

// Inisialisasi express
const app = express();

// Kunci rahasia dari variabel lingkungan
const SECRET_KEY = process.env.SECRET_KEY || "secret key!";
const SSL = process.env.SSL === "true";
const PORT = process.env.PORT || 3000;
const STATIC_SALT_CSRF = process.env.STATIC_SALT_CSRF || "some key";


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("http://localhost:3000"));

// Fungsi untuk menghasilkan token JWT
const generateJwtToken = (username) => {
	return jwt.sign({ username }, SECRET_KEY, {
		expiresIn: "1h",
	});
};

// Fungsi untuk mengatur cookie
const setJwtCookies = (res, token) => {
	const token_jwt_base64 = Buffer.from(token).toString("base64");
	const token_jwt_base64_a = token_jwt_base64.substring(0, 10);
	const token_jwt_base64_b = token_jwt_base64.substring(10);

    // Mengatur cookie
	setCookie(res, [
		{
			key: "token_jwt_base64_a",
			value: token_jwt_base64_a,
			httpOnly: true,
			secure: SSL,
			sameSite: "Strict",
		},
		{
			key: "token_jwt_base64_b",
			value: token_jwt_base64_b,
			httpOnly: true,
			secure: SSL,
			sameSite: "Strict",
		},
	]);
};

// Middleware untuk memeriksa token JWT
const verifyJwtToken = (req, res, next) => {
    // Mengambil cookie
	const token_a = req.cookies.token_jwt_base64_a;
	const token_b = req.cookies.token_jwt_base64_b;

    // Cek apakah token ada
	if (!token_a || !token_b) {
		return res.status(401).send({ message: "No token provided" });
    }

    // Verifikasi token JWT
    try {
        // Menggabungkan token dan decode base64
        const token = Buffer.from(token_a + token_b, "base64").toString("utf8");

        // Mengecek apakah token valid
		const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;
		next();
    }
    
    // Jika token tidak valid
    catch (err) {
		res.status(401).send({ message: "Invalid token" });
	}
};


// Halaman utama
app.get("/", (req, res) => {
    res.send(`
        <h1>We provide API service</h1>
        <pre>
            get  | /api/v1/login
            post | /api/v1/register
            post | /api/v1/logout
            post | /api/v1/check-cookies
            post | /api/v1/logger
        </pre>
        `);
});

// Endpoint cek cookie
app.post("/api/v1/check-cookies", verifyJwtToken, (req, res) => {
    res.send({
        username: req.user.username,
    });
});

// Endpoint login
app.post("/api/v1/login", (req, res) => {
    // Mengambil username dan password
    const { username, password } = req.body;
    
    // Cek apakah username dan password valid
    if (username === "a" && password === "a*") {
        const token_jwt = generateJwtToken(username);

        // Mengatur cookie
        setJwtCookies(res, token_jwt);

        // Mengembalikan respons
        res.send({ message: "Login success" });
    } else {
        // Jika username dan password tidak valid
        res.status(401).send({ message: "Invalid credentials", error: true });
	}
});



// Endpoint register
app.post("/api/v1/register", validateRegistration, (req, res) => {

    // Mengambil username dan password
    const { username, password } = req.body;
    res.send(req.body);
})

// Endpoint logout
app.post("/api/v1/logout", (req, res) => {
    // Menghapus cookie
    setCookie(res, [
        {
            key: "token_jwt_base64_a",
            value: "",
            httpOnly: true,
            secure: SSL,
            sameSite: "Strict",
            maxAge: 0, // Mengatur cookie untuk kadaluarsa segera
        },
        {
            key: "token_jwt_base64_b",
            value: "",
            httpOnly: true,
            secure: SSL,
            sameSite: "Strict",
            maxAge: 0, // Mengatur cookie untuk kadaluarsa segera
        },
    ]);
    res.send({ message: "Logout successful" });
});

app.post("/api/v1/logger", (req, res) => {
    console.log("\n" + JSON.parse(req.body.log).date);
    res.send("success write log");
}); 

app.post("/api/v1/create-one-time-token", (req, res) => {
    const key = req.body.key;

    const createOneTimeToken = (key, STATIC_SALT_CSRF) => {
        const key_0 = key + Date.now();
        let hash = CryptoJS.SHA256(key_0).toString(CryptoJS.enc.Hex);
        const key_1 = key_0 + STATIC_SALT_CSRF;
        hash = CryptoJS.SHA256(key_1).toString(CryptoJS.enc.Hex);
        return hash;
    }

    const addKeyAndTokenToDatabase = async (key, hash) => {
        // Menambahkan key dan token ke database
    }

    const hash = createOneTimeToken(key, STATIC_SALT_CSRF);
    
    addKeyAndTokenToDatabase(key, hash);

    res.send({"key": key, "hash": hash})
})

// Menjalankan server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));