

const mongoose = require('mongoose');
const schema= mongoose.Schema;
let adminSchema = new schema({
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

const db = mongoose.model('admin', adminSchema);

module.exports = db;