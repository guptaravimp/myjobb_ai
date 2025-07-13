
const mongoose = require("mongoose");

require("dotenv").config();

exports.DBConnect = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("Database connection successful");
	} catch (err) {
			console.log(`DB CONNECTION ISSUES`);
			console.error(err.message);
		throw err;
	}
};
