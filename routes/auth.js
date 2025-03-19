
/* 
    This file is responsible for handling the routes related to the authentication of the user.
    host + /api/auth
*/
const express = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validatorFields');
const { validatorJWT } = require('../middlewares/validatorJwt');

const router = express.Router();

//* POST /api/auth/ -> Login
router.post('/', 
    [
        // Middlewares
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser);


//* POST /api/auth/register -> Register
router.post(
    '/register', 
    [
        // Middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ], 
    createUser);

//* GET /api/auth/renew -> Renew token
router.get('/renew', validatorJWT, revalidateToken);

module.exports = router;