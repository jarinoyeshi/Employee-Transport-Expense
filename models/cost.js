
const mongoose= require("mongoose");
const schema = mongoose.Schema;

let costschema = new schema({
    EmployeeId: {
        type: String, 
        unique: true, 
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
        require: true
    },
    Vehicle_type: {
        type: String, 
        require: true
    },
    Vehicle_no: {
        type: String, 
        require:true
    },
    Month: {
        type: String, 
        require: true
    },
    Fuel_type: {
        type:String, 
        require: true
    },
    Meter_start: {
        type:String, 
        require: true 
    },
    Meter_end: {
        type:String, 
        require: true
    },
    Traversal_perday_KM: {
        type:String, 
        require: true
    },
    Fuel_entered_perday: {
        type:String, 
        require: true
    },
    Days_count: {
        type:String, 
        require: true
    },
    Perday_cost: {
        type:String, 
        require: true
    },
    Monthly_cost: {
        type:String, 
        require: true
    }
    

}) 
const costDB = mongoose.model('expenditure',costschema);
module.exports= costDB;