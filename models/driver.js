

const mongoose= require('mongoose');
const schema= mongoose.Schema;

let driverSchema= new schema({

    ID:{
        type: String,
        unique: true,
        required: true

    },
    Full_Name:{
        type : String,
        required: true
    },

    Transport_id:{
        type: String,
        required: true
    },

    Salary:{
        type: String,
        required: true
    },

    Hire_date:{
        type: String,
        required: true
    },

    Exit_Date:{
        type : String,
    },

    Phone:{
        type : String,
        
    }

})

const driverDB = mongoose.model('driverDB',driverSchema);
module.exports = driverDB;