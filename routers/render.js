const express=require("express");
const Club = require('../models/club');
const Admin = require('../models/admin');
const CostV = require('../models/cost');
const Router= express.Router();
const ejs = require('ejs');
const pdf = require('html-pdf');
var fs = require('fs');
const path = require('path');
var XLSX       = require('xlsx');
var multer     = require('multer');
var mongoose   = require('mongoose');

/* Function starts  */


/*===================== Login =================================== */
exports.login = (req, res) =>{
    res.render('login');
}


  


/*===================== Logout =================================== */
exports.logout = (req, res) =>{
    res.render('login');
}
/*===================== Show Data to Index Page =================================== */
exports.showData = (req, res) =>{
    Club.find((err,docs)=>{
        if(err) throw err;    
        res.render('index',{
            employee: docs
        })
    })
}
/*===================== Show Data to Admin Page =================================== */
exports.showDataAdmin = (req, res) =>{
    Club.find((err,docs)=>{
        if(err) throw err;    
        res.render('AdminHome',{
            employee: docs
        })
    })
}



/*===================== Add New employee =================================== */
exports.addUser = (req, res) =>{
    res.render('addUser');
}


/*===================== Edit Employee =================================== */
exports.edit= (req,res)=>{
    
    Club.findByIdAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
        if(err){
            console.log(err+" cannot update");
        }else{
            res.render('edit',{employeedata:docs})
            console.log(docs);
        }
    })
}



/*===================== Add Admin =================================== */
exports.addAdmin = (req, res) =>{
    res.render('addAdmin');
}
/*===================== Edit Admin =================================== 
exports.editAdmin = (req, res) =>{
    res.render('login');
}
*/
/*===================== Delete Admin =================================== 
exports.deleteAdmin = (req, res) =>{
    res.render('login');
}
*/

/*===================== add_vehicle_Expenditure =================================== */
exports.addVehicleExpenditure = (req, res) =>{
    res.render('addVehicleExpenditure');
}



/*===================== show_fuel_Expenditure =================================== */
exports.show_fuel_Expenditure = (req, res) =>{
    
    CostV.find((err,docs)=>{
        if(err) throw err;
        res.render('fuelExpenditure',{
            expenditure: docs
        })
        
    }) 
}




/*===================== Show notification Index Page =================================== */
exports.notification = (req, res) =>{
    res.render('notification');
}
exports.logout = (req, res) =>{
    res.render('login');
}


exports.test = (req, res) =>{
    res.render('test');
}


/*===================== Add Driver =================================== */
exports.addDriver = (req, res) =>{
    res.render('addDriver');
}