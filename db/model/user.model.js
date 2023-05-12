const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
userName: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
age: Number,
gender: {
    type: String,
    num: ['Male','Female'],
    default: "Male"
},
confirmEmail: {
    type: Boolean,
    default: false
},
profilePic: String

},{timestamps: true});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;

