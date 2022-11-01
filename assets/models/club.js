

const mongoose = require('mongoose');
const schema= mongoose.Schema;
let clubSchema = new schema({
   userid: {
        type : String,
        unique: true,
        required: true
        
    }, 
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    phoneNumber : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true
        
    }
   
})

const Userdb = mongoose.model('employee', clubSchema);

module.exports = Userdb;