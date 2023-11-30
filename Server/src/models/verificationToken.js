const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// User verification model with otp/token
const verificationTokenSchema = new mongoose.Schema({
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
        expires: "1m",
        default: Date.now()
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

// Hash token before data save
verificationTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        const hashToken = await bcrypt.hash(this.token, 8);
        this.token = hashToken
    }
    next();
})


// compare token for user login
verificationTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result
}

// sava data into users collection
const VerificationToken = mongoose.model('verificationToken', verificationTokenSchema);
module.exports = VerificationToken;