const checkCookies = (req, res) => {
	res.send({
		status: "validated",
		username: req.user.email,
	});
};

export default checkCookies