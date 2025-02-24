const mongoose = require('mongoose')
require('dotenv')
const dbConnection =async ()=>{
    try {
     await   mongoose.connect(process.env.DB_CNN);
     console.log('db online')
    } catch (error) {
        console.log(error)
        throw new Error('failed database init')
    }
}

module.exports = {
    dbConnection
}