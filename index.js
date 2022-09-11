const express = require('express');
var cors = require('cors')
const { dbConnection } = require('./database/config');

require('dotenv').config()

/* Crear servidor express */

const app = express();

/* Cors */
app.use(cors())

/* DB Conection */
dbConnection();

/* Public folder */
app.use( express.static('public') );

/* body parser */
app.use( express.json() )

/* Routes */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));




/* escuchar peticiones */

app.listen(process.env.PORT, ()=>{
    console.log(`server on port ${process.env.PORT}`)
})