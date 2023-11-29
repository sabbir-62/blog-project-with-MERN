const mongoose = require('mongoose');

//Database Connection
const connection = async () => {
    const uri = process.env.DATABASE

    mongoose.connect(uri)
        .then(() => {
            console.log("Database Connection Successfully");
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = connection;
