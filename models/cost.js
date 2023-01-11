
const mongoose= require("mongoose");
const schema = mongoose.Schema;

let costschema = new schema({
    Employee: {
        type: Number,  
        require: true,
        minlength: 7,
        maxlength: 7
    },

    Salary: {
        type: Number, 
        require: true
    },
    Vehicles: {
        type: String, 
        
    },
    Vehicle_type: {
        type: String, 
        
    },
    Vehicle_id: {
        type: Number, 
        
    },
    Vehicle_no: {
        type: String, 
       
    },
    Month: {
        type: String, 
        
    },
    Fuel_type: {
        type:String, 
        
    },
    Meter_start: {
        type:Number, 
        
    },
    Meter_end: {
        type:Number, 
       
    },
    Traversal_perday_KM: {
        type:Number, 
        
    },
    Fuel_entered_perday: {
        type:Number, 
        
    },
    Days_count: {
        type:String, 
       
    },
    Perday_cost: {
        type:String, 
        
    },
    Monthly_cost: {
        type:String, 
       
    },
    Limit: {
        type:String, 
       
    }
    

}) 
const costDB = mongoose.model('expenditure',costschema);
module.exports= costDB;