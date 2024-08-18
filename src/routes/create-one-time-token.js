import { STATIC_SALT_CSRF } from "../config/config.js";
import CryptoJS from "crypto-js";

const createOneTimeToken = (req, res) => {
	const key = req.body.key;

	const createOneTimeToken = (key, STATIC_SALT_CSRF) => {
		const key_0 = key + Date.now();
		let hash = CryptoJS.SHA256(key_0).toString(CryptoJS.enc.Hex);
		const key_1 = key_0 + STATIC_SALT_CSRF;
		hash = CryptoJS.SHA256(key_1).toString(CryptoJS.enc.Hex);
		return hash;
	};

	const addKeyAndTokenToDatabase = async (key, hash) => {
		// Menambahkan key dan token ke database
	};

	const hash = createOneTimeToken(key, STATIC_SALT_CSRF);

	addKeyAndTokenToDatabase(key, hash);

	res.send({ key: key, hash: hash });
};

export default createOneTimeToken;