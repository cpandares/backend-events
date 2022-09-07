const mongoose = require('mongoose');



const dbConnection = async()=>{
    try {

      await  mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

        console.log('Db Online')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error Db connection')
    }
}

module.exports = {
     dbConnection
}