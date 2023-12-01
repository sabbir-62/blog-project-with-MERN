const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

/*----------User verification model with otp/token----------*/
const resetPasswordTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 60,
        default: Date.now()
    }
},
    {
        versionKey: false
    }
)

// Hash token before data save
resetPasswordTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        const hashToken = await bcrypt.hash(this.token, 8);
        this.token = hashToken
    }
    next();
})


// compare token for user login
resetPasswordTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result
}

// sava data into users collection
const resetPasswordToken = mongoose.model('resetPasswordToken', resetPasswordTokenSchema);
module.exports = resetPasswordToken;