// create model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create schema
var userSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    place: String,
    country:String,
    activated: Boolean,default:false,
    activationCode: String,
    created_at: Date,
    updated_at: Date
});
// create model
var User = mongoose.model('User', userSchema);
// export model
module.exports = User;