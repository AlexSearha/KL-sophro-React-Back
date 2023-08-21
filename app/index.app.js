import express from "express";
import router from "./router/router.js"
//import doc from "./doc/swagger.doc.js";
// import errorMiddleware from "./helpers/error.middleware.js";
import cors from "cors";
import multer from "multer";


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

export default app;