const mongoose = require('mongoose');

//Database Connection
const connection = async () => {
    const uri =  "mongodb+srv://sabbir:sabbir5313@cluster0.d5mdcgc.mongodb.net/Blog"

    mongoose.connect(uri)
        .then(() => {
            console.log("Database Connection Successfully");
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = connection;
