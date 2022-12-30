const express=require("express");
const Club = require('../models/club');
const Admin = require('../models/admin');
const CostV = require('../models/cost');
const SecondAdmin = require('../models/secondAdmin');
const Router= express.Router();
const ejs = require('ejs');
const pdf = require('html-pdf');
var fs = require('fs');
const path = require('path');
var XLSX       = require('xlsx');
var multer     = require('multer');
var mongoose   = require('mongoose');

//generate pdf

const axios = require('axios');




/*===================== Login =================================== */

exports.loginmethod = async (req, res) =>{
    try{

        const Username =req.body.Username;
        const Password =req.body.Password;
        const Value = req.body.admin;
       
        
    
        if(Value==1){        
            const username= await Admin.findOne({Username:Username});            
            if(username.Password === Password){
                Club.find((err,docs)=>{
                    if(err) throw err;             
                    res.render('AdminHome',{
                        employee: docs
                    })
                })
                
            } else {
                res.send("password not matching");
            }


        }else{
            const username= await SecondAdmin.findOne({Username:Username});         
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
        }

        


    } catch(error){
        //res.status(400).send("Invalid Username");
        res.redirect('login');
    }
};

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
    const ValueMain = req.body.main;
    const ValueSecondary = req.body.secondary;

    if(ValueMain==1){

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

    }else if(ValueSecondary==0){
        const ID = req.body.ID;
        const Name = req.body.Name;
        const Phone= req.body.Phone;
        const Email = req.body.Email;
        const Username = req.body.Username;
        const Password = req.body.Password
    
        //console.log(userid, firstname );
    
        const secondadmin= new SecondAdmin({
            ID,
            Name,
            Phone,
            Email,
            Username,
            Password
        })
        secondadmin.save(err=>{
            if(err){
                console.log(err+" Cannot Add Secondary Admin ")
            }else{
                console.log("New Secondary Admin Added ")
                res.redirect('/')
            }
        })
    }


     

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

/*===================== Delete Employee Admin Expenditure ===================================*/ 
//Delete User/ Employee
exports.deleteUser = (req, res) =>{
    Club.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log(err+" Error occured in deletation");
        }else{
            console.log(" Employee deleted");
            res.redirect('/');
        }
    })
}


//Delete Admin 
exports.deleteAdmin = (req, res) =>{
    Admin.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log(err+" Error occured in deletation");
        }else{
            console.log(" Admin deleted");
            res.redirect('/');
        }
    })
}



// Delete Expenditure
exports.deleteVehicleExpenditure = (req, res) =>{
    CostV.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log(err+" Error occured in deletation");
        }else{
            console.log(" Expenditure deleted");
            res.redirect('/');
        }
    })
}


/*===================== Update Employee Admin Expenditure ===================================*/ 




exports.editUser= (req,res)=>{
    Club.findByIdAndUpdate({_id: req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log(err+" cannot Update");
        }else{
            console.log(" Update");
            res.redirect('/')
        }
    })
}


/*===================== generate PDF =================================== */
exports.generatePDF = async (req, res) =>{
    try{
        const employee= await Club.find();
        const data={
            employee:employee

        }


       const filePath= path.resolve(__dirname,'../views/transport_pdf.ejs');
        const htmlString = fs.readFileSync(filePath).toString();
        let option = {
            format: 'A3'
        }
        
        const ejsData= ejs.render(htmlString, data);
        pdf.create(ejsData,option).toFile('transport.pdf',(err,response)=>{
            if(err) console.log("pdf create "+err);
            console.log("file generated");
        
        const downloadPath = path.resolve(__dirname,'../transport.pdf');
            fs.readFile(downloadPath,(err,file)=>{
                if(err){
                    console.log(err);
                    return res.satus(500).send("couldn't downlad");
                }
                console.log("downloaded")

                res.setHeader('Content-Type','application/pdf');
                res.setHeader('Content-Disposition','attachment;filename="transport.pdf"');

                res.render('../views/test.ejs',file);
            })

        });

    }catch(error){
        console.log("catch "+error.message)

    }
}



/*
exports.downloadPDF = async (req, res) =>{

        
        const downloadPath = path.resolve(__dirname,'../transport.pdf');
            fs.readFile(downloadPath,(err,file)=>{
                if(err){
                    console.log(err);
                    return res.satus(500).send("couldn't downlad");
                }
                console.log("downloaded")

                res.setHeader('Content-Type','application/pdf');
                res.setHeader('Content-Disposition','attachment;filename="transport.pdf"');

                
            })

        };

*/




/*===================== Add Data From Excel =================================== 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './data')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  var upload = multer({ storage: storage });
  
 // var News = mongoose.model('member');


//var excelModel = mongoose.model('excelData',News);

exports.addUserFromExcel=('/addUserFromExcel',upload.single('excel'),(req,res)=>{

    var workbook =  XLSX.readFile(req.file.path);

    console.log(workbook)

  });
*/