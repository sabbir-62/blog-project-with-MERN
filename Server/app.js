const express = require('express');
const connection = require('./database/db');
const router = require('./src/routes/api')

const app = express();

app.use(express.json());

app.use(router)

//Database connection
connection()


module.exports = app;