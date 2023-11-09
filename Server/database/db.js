const mongoose = require('mongoose');
require('dotenv').config();


//Database Connection
const connection = async () => {
    const db = process.env.DATABASE;

    try {
        await mongoose.connect(db);
        
        console.log("Database Connection Success");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;
