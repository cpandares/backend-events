
/* 
     Events Routes
    host + /api/events

    Todas las rutas pasan por JWT
    Obtener todos los eventos
*/

const { Router } = require('express');
const { jwtValidate } = require('../middleware/validate-jwt');
const { check } = require('express-validator');
const { getEvents, createEvent, editEvent, deleteEvent } = require('../controllers/events');
const { fieldsValidation } = require('../middleware/fields-validate');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( jwtValidate );

router.get('/',  getEvents);

router.post(
    '/', 
    [
        check('title', 'Title is required').notEmpty(),
        check('start', 'Start date is required').custom(
            isDate
        ),
        check('end', 'End date is required').custom(
            isDate
        ),
        fieldsValidation
    ],
    createEvent);

router.put('/:id',  editEvent);
router.delete('/:id',  deleteEvent);



module.exports = router;