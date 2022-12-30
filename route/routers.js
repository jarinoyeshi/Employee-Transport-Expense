const express= require('express');
const routePath= express.Router();

// defining the path of function page
const render= require('../routers/render');
const controller= require('../routers/controller');
const Club = require('../models/club');
const Admin = require('../models/admin');
const CostV = require('../models/cost');
var fs = require('fs');
const path = require('path');
var XLSX       = require('xlsx');
var multer     = require('multer');


/*
1) login
2) logout

//--- Usr work---
3) Add User + Admin +add from excel
4) Update User + Admin
5 Delete User + Admin
--- transport work----
6 add transport
7 delete transport
8 update transport
---- driver work----
6 add driver
7 delete driver
8 update driver
*/

//Router.get('/pagename or link name',controller.function);

// function call
routePath.get('/login',render.login);
routePath.post('/login-method',controller.loginmethod);
routePath.get('/logout',render.logout);
routePath.get('/',render.showData);


/*----User-------*/ 
routePath.get('/add-User',render.addUser);

/*----Driver-------*/ 
routePath.get('/add-Driver',render.addDriver);


//routePath.get('/addUserFromExcel',controller.addUserFromExcel);
//routePath.post('/addUserFromExcel',controller.addUserFromExcel);

routePath.get('/test',render.test);
//routePath.get('/download-pdf', controller.downloadPDF);


// homepage For Admin
routePath.get('/AdminHome',render.showDataAdmin);
routePath.get('/notification-window',render.notification);

/*
routePath.get('/editUser',render.edit_user);

*/
/*----Admin----- */
routePath.get('/add-Admin',render.addAdmin);
/*
routePath.get('/editAdmin',render.editAdmin);

*/
/*---Expenditure----*/ 
routePath.get('/add-Vehicle-Expenditure',render.addVehicleExpenditure);
routePath.get('/fuelExpenditure',render.show_fuel_Expenditure);

routePath.get('/generate-fuel-pdf',controller.generatePDF);


/*=============================== API for function============================*/

//Create function
routePath.post('/api/users', controller.createUser);
routePath.post('/api/admins', controller.createAdmin);
routePath.post('/api/fuels', controller.createVehicleExpenditure);
routePath.post('/api/driver', controller.createDriver);

//Find function
//routePath.get('/api/users', controller.findUser);
//routePath.put('/api/users/:id', controller.update);
//routePath.delete('/api/users/:id', controller.delete);


//Delete Function
routePath.get('/delete/:id',controller.deleteUser);
routePath.get('/delete/:id', controller.deleteAdmin);
routePath.get('/delete/:id', controller.deleteVehicleExpenditure);


//Edit Function
//routePath.get('/edit-user',render.edit);
//routePath.put('/edit/:id',controller.editUser);

//routePath.get('/edit/:id', controller.editAdmin);
//routePath.get('/edit/:id', controller.editVehicleExpenditure);




/*=============== EDIT USER ===================== */
routePath.get('/edit/:id',(req,res)=>{
    
    Club.findByIdAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
        if(err){
            console.log("cannot update");
        }else{
            res.render('edit',{employeedata:docs})
        }
    })
})

routePath.post('/edit/:id',(req,res)=>{
    Club.findByIdAndUpdate({_id: req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log("Updatedd");
        }else{
            res.redirect('/')
        }
    })
})
/*=============== EDIT USER ===================== */


/*===============  ADD USER FROM EXCEL ===================== */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './data')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

  var upload = multer({ storage: storage });

routePath.post('/addUserFromExcel',upload.single('excel'),(req,res)=>{
    var workbook =  XLSX.readFile(req.file.path);
    console.log(" path name "+req.file.path) 
    var sheet_namelist = workbook.SheetNames;
    var x=0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        Club.insertMany(xlData,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log(" Excel data uploaded ");
            }
        })
        x++;
    });
    res.redirect('/');   
  });
  /*===============  ADD USER FROM EXCEL ===================== */








module.exports= routePath;
