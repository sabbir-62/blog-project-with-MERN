const app = require('./app');
const connection = require('./database/db');

const PORT = process.env.PORT || 8080

//Database connection
connection()

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})