const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


/*----------User model----------*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
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
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    }
},
{
    versionKey: false
}
)

// Hash password before data save
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const hashPassword = await bcrypt.hash(this.password, 8);
        this.password = hashPassword
    }

    next();
})

// compare password for user login
userSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compareSync(password, this.password);
    return result
}

// sava data into users collection
const User = mongoose.model('users', userSchema);
module.exports = User;