const { model, Schema } = require('mongoose');
const { timeStamp } = require('node:console');
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken');


const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'name is required'],
        minLength: [5, "name at least 5 charactor"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ]
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, "password at least 8 charactor"],
        select: false, // will not select password upon loking up a document
    },
    avator: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
},
    {
        timestamps: true,
    },

);

// increpted the password before save into db
userSchema.pre('save', function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = bcrypt.hash(this.password, 10)
})

// generate token 
userSchema.methods = {
    generateJWTToken: async function() {
        return await jwt.sign(
            {_id: this._id, email: this.email, subscription: this.subscription},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRY}
        )
    },

    compairePassword: async function(plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    }
}


const User = model('User', userSchema);

module.exports = User;