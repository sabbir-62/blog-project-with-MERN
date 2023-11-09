const express = require('express');
const connection = require('./database/db');

const app = express();


//Database connection
connection()


module.exports = app;