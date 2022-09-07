
const { response } = require('express');
const jwt  = require('jsonwebtoken');

const jwtValidate = (req, res = response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Not authenticated'
        })
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT
        )

       req.uid = payload.uid;
       req.name = payload.name;
        
    } catch (error) {
        return res.status(401).json({
            ok: falsem,
            msg: 'Invalid token'
        })
    }


    next()

}

module.exports = {
    jwtValidate
}