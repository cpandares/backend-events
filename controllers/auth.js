const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { jwtGenerate } = require('../helpers/jwt');


const registerUser = async(req, res = response )=>{

   const  { email, password } = req.body;
    
   try {

        let user = await User.findOne({ email });

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

       user = new User( req.body );

       /* Password hash */
       const salt = bcrypt.genSaltSync();
       user.password = bcrypt.hashSync( password, salt );
    
       await user.save();

       const token  = await jwtGenerate( user.id, user.name );
             
        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token,
            msg: 'Success'        
        })
    
   } catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg: 'Something wrong'
    })
   }
}

const login = async(req, res = response)=>{

    const  { email, password } = req.body;
    
    try {

        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email or password not valid'
            })
        }

        /* password confirm */
        const validPassword = bcrypt.compareSync( password, user.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Email or password is not valid'
            })
        }

        const token  = await jwtGenerate( user.id, user.name );

        res.status(200).json({
            ok:true,
            msg: 'login',
            email,
            token,
            password
        })

        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Something wrong'
        })      
        
    }
    
}

const renewToken = async(req, res = response)=>{
  
    const uid = req.uid;
    const name = req.name;

    const token  = await jwtGenerate( uid, name );

    res.json({
        ok:true,        
        token,
        msg: 'token renew'
    })
}


module.exports = {
    registerUser,
    login,
    renewToken
}