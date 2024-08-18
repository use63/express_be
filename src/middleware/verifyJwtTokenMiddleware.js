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
	} catch (err) {
		// Jika token tidak valid
		res.status(401).send({ message: "Invalid token" });
	}
};

export default verifyJwtToken;