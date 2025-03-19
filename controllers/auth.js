const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                ok: false,
                message: 'The user does not exist with this email'
            });
        }

        //* Confirm passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                message: 'Incorrect password'
            });
        }

        //* Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            message: 'Login!',
            uid: user.id,
            name: user.name,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please contact the administrator'
        });
    }
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                ok: false,
                message: 'The user already exists'
            });
        }

        user = new User(req.body);

        //* Encrypt password
        const salt = bcrypt.genSaltSync(); // Generar un numero aleatorio, por defecto 10 veces
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        //* Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please contact the administrator'
        });
    }
}

const revalidateToken = async (req, res = response) => {
    
    const { uid, name } = req;

    //* Generate a new JWT and return it in the response
    const token = await generateJWT(uid, name);
    res.json({ ok: true, token });
}



module.exports = {
    createUser,
    loginUser,
    revalidateToken
}