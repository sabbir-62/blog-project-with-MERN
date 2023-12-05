const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

/*----------User verification model with otp/token----------*/
const loginUserSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 5*60,
        default: Date.now()
    }
},
    {
        versionKey: false
    }
)

// Hash password before data save
loginUserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const hashPassword = await bcrypt.hash(this.password, 8);
        this.password = hashPassword
    }

    next();
})

// compare password for user login
loginUserSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compareSync(password, this.password);
    return result
}

// Hash token before data save
loginUserSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        const hashToken = await bcrypt.hash(this.token, 8);
        this.token = hashToken
    }
    next();
})

// compare token for user login
loginUserSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result
}

// sava data into users collection
const loginUser = mongoose.model('loginUser', loginUserSchema);
module.exports = loginUser;