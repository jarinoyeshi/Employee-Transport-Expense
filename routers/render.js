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

exports.loginmethod = async (req, res) =>{
    try{

        const Username =req.body.Username;
        const Password =req.body.Password
        const username= await Admin.findOne({Username:Username});
        
        if(username.Password === Password){
            Club.find((err,docs)=>{
                if(err) throw err;             
                res.render('index',{
                    employee: docs
                })
            })
            
        } else {
            res.send("password not matching");
        }

    } catch(error){
        res.status(400).send("Invalid Username");
    }
};


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



/*===================== Add New employee =================================== */
exports.addUser = (req, res) =>{
    res.render('addUser');
}


/*===================== Add Data From Excel =================================== */
exports.add_User_From_Excel = (req, res) =>{
    res.render('login');
}
/*===================== Edit Employee =================================== 
exports.edit_user = (req, res) =>{
    res.render('login');
}
*/
/*===================== Delete Employee =================================== 
exports.delete_user = (req, res) =>{
    res.render('login');
}
*/




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
    res.render('login');
}







/*===================== generate PDF =================================== */
exports.generatePDF = (req, res) =>{
    res.render('login');
}
exports.logout = (req, res) =>{
    res.render('login');
}


/*===================== Show Data to Index Page =================================== */
exports.logout = (req, res) =>{
    res.render('login');
}


