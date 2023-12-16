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


// rate limit
const limiter = expressRateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    message: 'Too many requests sent from this IP. Please try again after 1 minute',
    headers: true, // Trust headers set by a proxy (if applicable)
    standardHeaders: true,
    legacyHeaders: false
});
app.use(limiter);


//Routes
readdirSync('./src/routes').map(r => app.use('/api/v1', require(`./src/routes/${r}`)));

app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Invalid Request!"
    })
})



module.exports = app;