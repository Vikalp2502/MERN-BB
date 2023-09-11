const express = require("express");

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv/config");
app.use(
	cors({
		origin: "*",
	})
);
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));

//env var
const URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8000;

const connectDb = () => {
	mongoose
		.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Database is connected...");
		})
		.catch((error) => {
			console.log("Error:", error.message);
		});
};

connectDb();

app.get("/", async (req, res) => {
	res.set("Access-Control-Allow-Origin", "*");
	res.send({ msg: "Server up and running" });
});

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
});
