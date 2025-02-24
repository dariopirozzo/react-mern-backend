const mongoose = require('mongoose')
require('dotenv').config()
const dbConnection =async ()=>{
    try {
     await   mongoose.connect(process.env.DB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Espera 5 segundos antes de fallar
      });
     console.log('db online')
    } catch (error) {
        console.log(error)
        throw new Error('failed database init')
    }
}

module.exports = {
    dbConnection
}