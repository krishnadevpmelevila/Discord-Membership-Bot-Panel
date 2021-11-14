// create model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create schema
var activationSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    activated: Boolean,default:false,
    paid: Boolean,default:false,
    activationCode: String,
    discordid: String,default:false,
    created_at: Date,
    updated_at: Date
});
// create model
var Activation = mongoose.model('Activation', activationSchema);
// export model
module.exports = Activation;