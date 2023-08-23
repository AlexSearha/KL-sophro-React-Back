const express =  require("express");
const router = require("./views/router");
//import doc from "./doc/swagger.doc.js";
// import errorMiddleware from "./helpers/error.middleware.js";
const cors = require("cors");
const multer = require("multer");


const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(errorMiddleware);

const mutipartParser = multer();

app.use(mutipartParser.none());

app.use(router);

router.use((req, res) => {

	return res.status(404).json({ error: "404 - Page not found" });
});

//doc(app);

module.exports = app;