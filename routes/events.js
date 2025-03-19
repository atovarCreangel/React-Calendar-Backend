/* 
    This file is responsible for handling the routes related to the events of the user.
    host + /api/events
*/
const express = require('express');
const { check } = require('express-validator');
const { validatorJWT } = require('../middlewares/validatorJwt');
const { validateFields } = require('../middlewares/validatorFields');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = express.Router();

//* Middlewares for all routes
router.use(validatorJWT);

//* GET /api/events/ -> Get events
router.get('/', getEvents);

//* POST /api/events/ -> Create event
router.post(
    '/', 
    [
        // Middlewares
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'The start date is required').custom( isDate ),
        check('end', 'The end date is required').custom( isDate ),
        validateFields
    ],
    createEvent);

//* PUT /api/events/:id -> Update event
router.put('/:id', updateEvent);

//* DELETE /api/events/:id -> Delete event
router.delete('/:id', deleteEvent);

module.exports = router;