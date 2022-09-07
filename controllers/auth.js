const { response } = require('express')
const { validationResult } = require('express-validator');

const registerUser = (req, res = response )=>{

   const  { name, email, password } = req.body;
    
  
    res.status(201).json({
        ok:true,
        msg: 'Register',
        name,
        email,
        password
    })
}

const login = (req, res = response)=>{

    const  { email, password } = req.body;
    
    
    res.status(200).json({
        ok:true,
        msg: 'login',
        email,
        password
    })
}

const renewToken = (req, res = response)=>{
  
    res.json({
        ok:true,
        msg: 'token renew'
    })
}


module.exports = {
    registerUser,
    login,
    renewToken
}