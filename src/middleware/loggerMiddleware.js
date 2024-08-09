import morgan from "morgan";
import axios from "axios";

// Membuat format log JSON untuk morgan
morgan.token("id", function getId(req) {
	return req.id;
});

morgan.token("param", function (req, res, param) {
	return req.params[param];
});

const jsonFormat = (tokens, req, res) => {
	if (req.url.startsWith("/api/v1/logger")) {
		// Mengembalikan string kosong untuk endpoint yang dikecualikan
		return "";
	}

	return JSON.stringify({
		method: tokens.method(req, res),
		url: tokens.url(req, res),
		status: tokens.status(req, res),
		res: {
			content_length: tokens.res(req, res, "content-length"),
		},
		response_time: tokens["response-time"](req, res) + " ms",
		date: tokens.date(req, res, "iso"),
		remote_addr: tokens["remote-addr"](req, res),
		user_agent: tokens["user-agent"](req, res),
	});
};

// Fungsi untuk mencetak log ke console.log
const logHttp = (host, log) => {
	if (log) {
		// Hanya kirim log jika log tidak kosong
		axios
			.post(`${host}/api/v1/logger`, { log })
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Server Logger Error");
			});
	}
};

// Buat middleware morgan dengan fungsi kustom
const logger = (host) => {
	return morgan((tokens, req, res) => jsonFormat(tokens, req, res), {
		stream: {
			write: (message) => logHttp(host, message.trim()), 
		},
	});
};

export default logger;
