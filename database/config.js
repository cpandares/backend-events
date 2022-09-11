const mongoose = require('mongoose');



const dbConnection = async()=>{
    try {

      await  mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

       
        
    } catch (error) {
       
        throw new Error('Error Db connection')
    }
}

module.exports = {
     dbConnection
}