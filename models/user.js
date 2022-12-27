



const mongoose = require('mongoose');
const schema= mongoose.Schema;
let userSchema = new schema({
   ID: {
        type : String,
        unique: true,
        required: true
        
    }, 
    Name : {
        type : String,
        required: true
    },
    Phone : {
        type : String,
        required: true
    },
    Email : {
        type: String,
        required: true
        
    },
    Username : {
        type : String,
        required: true
    },
    Password : {
        type : String,
        required: true
    }
   
})

const dbu = mongoose.model('user', userSchema);

module.exports = dbu;