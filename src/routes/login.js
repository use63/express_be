import jwt from "jsonwebtoken";
import { SECRET_KEY, SSL } from "../config/config.js";
import { setCookie } from "../utils/index.js";
// Fungsi untuk menghasilkan token JWT
const generateJwtToken = (email) => {
	return jwt.sign({ email }, SECRET_KEY, {
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

const login = (req, res, next) => {
	// Mengambil email dan password
	const { email, password } = req.body;

	// Cek apakah email dan password valid
	if (email === "a" && password === "a*") {
		const token_jwt = generateJwtToken(email);

		// Mengatur cookie
		setJwtCookies(res, token_jwt);

		// Mengembalikan respons
		res.send({ message: "Login success" });
	} else {
		// Jika email dan password tidak valid
		res.status(401).send({ message: "Invalid credentials", error: true });
    }

    next();
};

export default login;
