const express = require('express');
const connection = require('./database/db')

const app = express();

const PORT = 8000;


connection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})