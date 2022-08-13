const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
    }
})

const UserData = new mongoose.model('todoUsers' , UserSchema)

module.exports = UserData;