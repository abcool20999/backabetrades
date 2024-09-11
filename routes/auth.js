const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    usernameOrEmail: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    alpaca_account_id: {
        type: String,
        required: true,
        unique: true,
    },
    
    alpaca_account_number: {
        type: String,
        required: true,
        unique: true,
    },
    available_balance: {
        type: mongoose.Types.Decimal128
    },
    password: {
        type: String,
        required: false,
    },
    
    // firstName:{
    //     type: String,
    //     required: true
    // },
    // lastName:{
    //     type: String,
    //     required: false
    // },
    otherInfo:{
        type: String,
        required: false
    }
});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    if(this.password){
        // const salt = await bcrypt.genSalt(10);
        const salt = 10;
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
});

// Compare the password during login
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
