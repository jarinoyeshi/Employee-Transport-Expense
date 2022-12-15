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

exports.createUser=(req,res)=>{
     
    const Employee_ID = req.body.Employee_ID;
    const Full_Name = req.body.Full_Name;
    const Job_Title = req.body.Job_Title;
    const Department= req.body.Department;
    const Business_Unit = req.body.Business_Unit;
    const Gender= req.body.Gender;
    const Age = req.body.Age;
    const Hire_Date= req.body.Hire_Date;
    const Annual_Salary = req.body.Annual_Salary;
    const Bonus_percentage= req.body.Bonus_percentage;
    const Exit_Date = req.body.Exit_Date;
    const Email = req.body.Email;
    const Phone = req.body.Phone

    console.log(Employee_ID, Full_Name,Job_Title,Department,Business_Unit,Gender,Age,Annual_Salary,Bonus_percentage,Exit_Date,Email,Phone );

    const club= new Club({
        Employee_ID,
        Full_Name,
        Job_Title,
        Department,
        Business_Unit,
        Gender,
        Age,
        Hire_Date,
        Annual_Salary,
        Bonus_percentage,
        Exit_Date,
        Email,
        Phone

    })
    club.save(err=>{
        if(err){
            console.log(err+" Cannot Add Employee")
        }else{
            console.log("New Employee Added")
            res.redirect('/')
        }
    })
}

/*====================== Create Admin ======================== */


exports.createAdmin=(req,res)=>{

    const ID = req.body.ID;
    const Name = req.body.Name;
    const Phone= req.body.Phone;
    const Email = req.body.Email;
    const Username = req.body.Username;
    const Password = req.body.Password

    //console.log(userid, firstname );

    const admin= new Admin({
        ID,
        Name,
        Phone,
        Email,
        Username,
        Password
    })
    admin.save(err=>{
        if(err){
            console.log(err+" Cannot Add Admin ")
        }else{
            console.log("New Admin Added ")
            res.redirect('/')
        }
    })
     

}


/*====================== Create Vehicle Expenditure ======================== */
exports.createVehicleExpenditure=(req,res)=>{
    const Employee= req.body.Employee;
    const Name= req.body.Name;
    const Salary = req.body.Salary;
    const Vehicles= req.body.Vehicles;
    const Vehicle_type= req.body.Vehicle_type; 
    const Vehicle_id= req.body.Vehicle_id; 
    const Vehicle_no= req.body.Vehicle_no;
    const Month = req.body.Month;
    const Fuel_type= req.body.Fuel_type;
    const Meter_start=  req.body.Meter_start;
    const Meter_end= req.body.Meter_end;
    const Traversal_perday_KM = req.body.Traversal_perday_KM;
    const Fuel_entered_perday= req.body.Fuel_entered_perday;
    const Days_count = req.body.Days_count;
    const Perday_cost = req.body.Perday_cost;
    const Monthly_cost =req.body.Monthly_cost;
    const Limit =req.body.Limit;

   // console.log(employeeid,name, salary, vehicle, vehicletype, vehicleno, month, fueltype,  metertart, meterend, traversalperday, fuelenteredperday, dayscount, perdaycost, monthlycost )
    
    const costv = new CostV({
           Employee,
           Name,
           Salary,
           Vehicles,
           Vehicle_type,
           Vehicle_id,
           Vehicle_no,
           Month,
           Fuel_type,
           Meter_start,
           Meter_end,
           Traversal_perday_KM,
           Fuel_entered_perday,
           Days_count,
           Perday_cost,
           Monthly_cost,
           Limit

       })
       costv.save(err=>{
        if(err){
            console.log(err+" Cannot add expenditure of vehicles");
        }else{
            console.log(" Expenditure Added ");
            res.redirect('/');
         }
        })
     

}




