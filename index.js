const express = require('express');
const { dbConnection } = require('./db/config');
const cors =require('cors')
require('dotenv').config()

const app = express();

dbConnection()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


app.listen( 4000,()=>{
    console.log(`server corriendo en ${process.env.PORT}`);
});

