const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    }
},
{
    versionKey: false,
    timestamps: true
}
)

const User = mongoose.model('users', userSchema);

module.exports = User;