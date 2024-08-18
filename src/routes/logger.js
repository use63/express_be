const logger = (req, res) => {
	console.log("\n" + JSON.parse(req.body.log).date);
	console.log(req.body.log);
	res.send("success write log");
};

export default logger;