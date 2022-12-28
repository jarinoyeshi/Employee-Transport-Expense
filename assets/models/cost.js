
const mongoose= require("mongoose");
const schema = mongoose.Schema;

let costschema = new schema({
    Employee: {
        type: String,  
        require: true
    },
    Name: {
        type: String, 
        require: true
    },
    Salary: {
        type: String, 
        require: true
    },
    Vehicles: {
        type: String, 
        
    },
    Vehicle_type: {
        type: String, 
        
    },
    Vehicle_id: {
        type: String, 
        
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
        type:String, 
        
    },
    Meter_end: {
        type:String, 
       
    },
    Traversal_perday_KM: {
        type:String, 
        
    },
    Fuel_entered_perday: {
        type:String, 
        
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