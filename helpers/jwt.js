const jwt = require('jsonwebtoken');


const jwtGenerate = ( uid,name )=>{

    return new Promise((resolve, reject)=>{

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (error, token) =>{

            if(error){
               
                reject('Token error')
            }

            resolve( token )

        })

    })

}


module.exports = {
    jwtGenerate
}