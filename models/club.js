

const mongoose = require('mongoose');
const schema= mongoose.Schema;
let clubSchema = new schema({
    Employee_ID: {
        type : String,
        unique: true,
        required: true,
        minlength: 7,
        maxlength: 7
        
    }, 
    Full_Name : {
        type : String,
        required: true
    },
    Job_Title : {
        type : String,
        required: true
    },
    Department : {
        type : String,
        required: true
    },
    Business_Unit : {
        type: String,
        required: true
        
    },
    Gender : {
        type : String,
        required: true
    },
    Age : {
        type : String,
        required: true
    },
    
    Hire_Date : {
        type : String,
        required: true
    },
    Annual_Salary : {
        type : String,
        required: true
    },
    Bonus_percentage : {
        type : String,
    },
    Exit_Date : {
        type : String,
    },
    Email : {
        type : String,
        
    },
    Phone : {
        type : String,
        
    }
   
})

const Userdb = mongoose.model('member', clubSchema);

module.exports = Userdb;