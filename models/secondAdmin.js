



const mongoose = require('mongoose');
const schema= mongoose.Schema;
let secondAdminSchema = new schema({
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

const dbsa = mongoose.model('secondAdmin', secondAdminSchema);

module.exports = dbsa;