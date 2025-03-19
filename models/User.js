
const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String
    },
    /*role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },*/
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', userSchema);
