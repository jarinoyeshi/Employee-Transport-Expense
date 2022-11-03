const express=require("express");
const Router= express.Router();
const Club = require('../models/club');
const Admin = require('../models/admin');




/*------------------------- Add Routes of all ejs files-------------------------------------- */


Router.get('/',(err,res)=>{
    res.render('index');
})
Router.get('/addUser',(err,res)=>{
    res.render('addUser');
})
Router.get('/addAdmin',(err,res)=>{
    res.render('addAdmin');
})
Router.get('/edit',(err,res)=>{
    res.render('edit');
})
Router.get('/login',(err,res)=>{
    res.render('login');
})

Router.get('/show',(err,res)=>{
    res.render('show');
})


/*------------------------- Add User-------------------------------------- */
// insert data
Router.post('/add',(req,res)=>{
     
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
            console.log("errorrr")
        }else{
            console.log("added")
            res.redirect('/addUser')
        }
    })
})


/*------------------------- Add Admin-------------------------------------- */
//add Admin
Router.post('/addadmin',(req,res)=>{
     
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
            console.log("errorrr")
        }else{
            console.log("added")
            res.redirect('/index')
        }
    })
})



/*------------------------- Show data to Index page  -------------------------------------- */
//find data

Router.get('/index',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
        
        res.render('index',{
            employee: docs
        })
    })
})

Router.post('/login',async(req,res)=>{

    try{

        const Username =req.body.Username;
        const Password =req.body.Password

        const username= await Admin.findOne({Username:Username});
        
        if(username.Password === Password){
            res.status(201).render('index');
        } else {
            res.send("password not matching");
        }


    } catch(error){
        res.status(400).send("Invalid Username");
    }

    
           
})

/*------------------------- Update User Data   -------------------------------------- */
//update data

Router.get('/edit/:id',(req,res)=>{
    
    Club.findByIdAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
        if(err){
            console.log("cannot update");
        }else{
            res.render('edit',{employeedata:docs})
        }
    })
})

Router.post('/edit/:id',(req,res)=>{
    Club.findByIdAndUpdate({_id: req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log("Updatedd");
        }else{
            res.redirect('/index')
        }
    })
})



/*------------------------- Delete User data  -------------------------------------- */
//delete data

Router.get('/delete/:id',(req,res)=>{
    Club.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log("Error occured in deletation");
        }else{
            console.log("deleted");
            res.redirect('/index');
        }
    })
})

/*------------------------- Show from excel file to console [Experiment]-------------------------------------- */
//show employee from eccel sheet

/*
var XLSX = require("xlsx");
var workbook = XLSX.readFile("data/Employee_data.xlsx");

let worksheet = workbook.Sheets[workbook.SheetNames[0]];

for(let index=2;index<10; index++){
    const Employee_Id = worksheet['A${index}'].value;
    const Full_Name = worksheet['B${index}'].v;

    console.log({
        Employee_Id: Employee_Id, Full_Name: Full_Name
    })
}

*/

// Requiring the module
const reader = require('xlsx')
  
// Reading our test file
const file = reader.readFile('./data/Employee_data.xlsx')
  
let information = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
    information.push(res)
   })
}
//console.log(information)
// Printing data
Router.get('/show',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
        
        res.render('show',{
            information: docs
        })
    })
})
//console.log(information)









module.exports= Router;