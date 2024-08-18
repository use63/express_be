import { setCookie } from "../utils/index.js";
import { SSL } from "../config/config.js";

const logout = (req, res) => {
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
};

export default logout;
