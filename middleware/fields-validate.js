const { respost } = require('express');
const { validationResult } = require('express-validator');



const fieldsValidation = (req, res = respost, next)=>{

    const errors = validationResult( req );  

    if(!errors.isEmpty()){
      return res.status(400).json({
          ok:false,
          msg: errors.mapped()
      })
    }  

    next();

}


module.exports = {
    fieldsValidation
}