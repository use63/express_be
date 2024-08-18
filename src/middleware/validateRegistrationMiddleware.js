import { body, validationResult } from "express-validator";

const validateRegistration = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Username harus berupa email yang valid.")
		.normalizeEmail(),
	body("password")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		)
		.withMessage(
			"Password harus memiliki minimal 8 karakter, termasuk huruf besar, huruf kecil, angka, dan karakter spesial."
		)
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Menghapus properti value dari setiap error
			const sanitizedErrors = errors.array().map(({ msg, param, location }) => ({
					msg,
					param,
					location,
				}));
			return res.status(400).json({ errors: sanitizedErrors });
		}
		next();
	},
];

export default validateRegistration;
