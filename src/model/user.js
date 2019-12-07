const validator = require('validator');
const mongoose = require('mongoose');


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error(`The provided email address [${value}] is not valid!`)
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isLength(value, {min: 8})) {
                throw new Error(`The provided password has to be at least 8 character long!`)
            }
        }
    }
});

module.exports = User;
