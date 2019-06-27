const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

userSchema = new Schema ({

    firstname: {type: String, required: true},
    lastname : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},

}, { timestamps: true});

userModel = mongoose.model ("userModel", userSchema);
module.exports = userModel;
