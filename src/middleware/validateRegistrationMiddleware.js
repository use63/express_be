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
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export default validateRegistration;