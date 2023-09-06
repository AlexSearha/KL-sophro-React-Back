//import doc from "./doc/swagger.doc.js";
// import errorMiddleware from "./helpers/error.middleware.js";
require('dotenv').config();
const express =  require("express");
const cookieParser = require('cookie-parser');
const router = require("./views/router");
const whitelist = process.env.WHITELIST_DOMAINS;

const cors = require("cors");
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
    },
	credentials: true
};

const multer = require("multer");

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(errorMiddleware);

const mutipartParser = multer();

app.use(mutipartParser.none());

app.use(router);

router.use((_, res) => {

	return res.status(404).json({ error: "404 - Page not found" });
});

//doc(app);

module.exports = app;