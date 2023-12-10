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
app.use(express.json({ limit: '50mb' })); // Adjust the limit according to your needs
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Adjust the limit according to your needs
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(helmet());


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