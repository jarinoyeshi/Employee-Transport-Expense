
const mongoose= require("mongoose");
const schema = mongoose.Schema;

let fuelchema = new schema({
    Employee_Id: {
        type: Number,  
        require: true
    },
    
    Month: {
        Month_Name: {
            type: String,  
            require: true
        },
        Date: {
            Date_data: {
                Date_name: {
                    type: Number,  
                    require: true
                },
                Meter_start: {
                    type: Number,  
                    require: true
                },
                Meter_end: {
                    type: Number,  
                    require: true
                },
                Fuel_detail: {
                    Fuel_type: {
                        type: String,  
                        require: true
                    },   
                    Fuel_cost: {
                        type: Number,  
                        require: true
                    },
                },
            },


        },
        
    }

    

}) 
const fuelcostDB = mongoose.model('fuel',fuelchema);
module.exports= fuelcostDB;