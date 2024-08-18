const register = async (req, res) => {
	// Mengambil username dan password
	const { email, password } = req.body;

	UserModel.sync();

	try {
		const user = await UserModel.create({
			email: email,
			password: password,
		});
		// Mengembalikan respons
		res.send({ message: "Registration success", user: user });
	} catch (err) {
		// Jika username sudah ada
		res.status(400).send({
			message: "Email already registered.",
			error: true,
		});
	}
};

export default register;