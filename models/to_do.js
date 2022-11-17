const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const to_doSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}

);

//model
const To_do = mongoose.model('To_do', to_doSchema);
module.exports = To_do;
