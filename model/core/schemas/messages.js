const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from:{
        type: Number,
        required: true
    },
    to:{
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: false,
        default: 'sent'
    },
});

const message = mongoose.model('messages', MessageSchema);
module.exports = message;