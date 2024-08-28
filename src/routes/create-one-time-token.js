import { STATIC_SALT_CSRF } from "../config/config.js";
import CryptoJS from "crypto-js";
import { ottModel } from "../models/index.js";
import { dbman } from "../utils/index.js";
import db from "../utils/dbUtils.js";

const createOneTimeToken = (req, res) => {
	const key = req.body.key;

	if (!key) {
		return res.status(400).send({ error: "Key is required" });
	}

	const createOneTimeToken = (key, STATIC_SALT_CSRF) => {
		const key_0 = key + Date.now();
		let hash = CryptoJS.SHA256(key_0).toString(CryptoJS.enc.Hex);
		const key_1 = key_0 + STATIC_SALT_CSRF;
		hash = CryptoJS.SHA256(key_1).toString(CryptoJS.enc.Hex);
		return hash;
	};

	const addKeyAndTokenToDatabase = async (key, hash) => {
		console.log(await dbman.add(ottModel, { key: key, hash: hash }))
	};

	const hash = createOneTimeToken(key, STATIC_SALT_CSRF);

	addKeyAndTokenToDatabase(key, hash);

	res.send({ key: key, hash: hash });
};

export default createOneTimeToken;