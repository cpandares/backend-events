/* 
    Auth Routes
    host + /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, login, renewToken } = require('../controllers/auth');
const { fieldsValidation } = require('../middleware/fields-validate');
const { jwtValidate } = require('../middleware/validate-jwt');

const router = Router();


router.post(
    '/register', 
    [/* Middleware */
        check('name', 'Name is required').notEmpty(),
        check('name', 'Name is too short').isLength(2),
        check('email', 'Email is required').notEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is required').notEmpty(),
        check('password', 'Password is too short').isLength(6),
        fieldsValidation
    ],
    registerUser )

/* Login */
router.post( 
    '/',
        [/* Middleware */        
        check('email', 'Email is required').notEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is required').notEmpty(),
        check('password', 'Password is too short').isLength(6),
        fieldsValidation
        ], 
    login
    )

router.get('/renew', jwtValidate,renewToken)


module.exports = router;