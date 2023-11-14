// Imports
const {readdirSync} = require('fs')
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const helmet = require('helmet');
const cors = require('cors');
const expressRateLimit = require('express-rate-limit')

const app = express();

// Middlewares
app.use(express.json());
app.use(cors);
app.use(helmet);


// Express rate limit
const limiter = expressRateLimit({
    window: 1 * 60 * 1000,
    max: 10,
    message: 'Too many request sent from this ip. Please try again after 1 minute',
    standardHeaders: true,
    legacyHeaders: false
})
app.use(limiter);


//Routes
readdirSync('./src/routes').map(r => app.use('/api/v1', require(`./src/routes/${r}`)));


module.exports = app;