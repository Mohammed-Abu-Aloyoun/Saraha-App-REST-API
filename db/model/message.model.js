const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const messageSchema = mongoose.Schema({
text: {
    type: String,
    required: true
},
reciverid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
}

},{timestamps: true});

const messageModel = new mongoose.model('message',messageSchema);

module.exports = messageModel;
