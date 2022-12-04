

const express=require("express");
const Router= express.Router();
const Club = require('../models/club');
const Admin = require('../models/admin');
const CostV = require('../models/cost');
var XLSX       = require('xlsx');
var multer     = require('multer');
var mongoose   = require('mongoose');




/*------------------------- Add Routes of all ejs files-------------------------------------- */

/*
Router.get('/',(err,res)=>{
    res.render('index');
})
*/




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
/*
Router.get('/fuelExpenditure',(err,res)=>{
    res.render('fuelExpenditure');
})
*/
Router.get('/addVehicle',(err,res)=>{
    res.render('addVehicle');
})

/*
Router.get('/perEmployeeExpenditure',(err,res)=>{
    res.render('perEmployeeExpenditure');
})
*/


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





/*------------------------- Add User from excel-------------------------------------- */

//multer
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

Router.post('/',upload.single('excel'),(req,res)=>{
    var workbook =  XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x=0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        Club.insertMany(xlData,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                //console.log(data);
            }
        })
        x++;
    });
    res.redirect('/index');
  });













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

Router.get('/',(req,res)=>{

    Club.find((err,docs)=>{
        if(err) throw err;
        
        res.render('index',{
            employee: docs
        })
    })

})


/*------------Login code---------- */
Router.post('/loginmethod',async(req,res)=>{

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
            //res.status(201).render('addadmin');
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
            res.redirect('/')
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
            res.redirect('/');
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



/*--------------------vehicle Cost calculation section--------------------------------------- */
/*------------------------------------------------------------------------------------------- */
/*---------------------add vehicle Expenditure----------------------------------------------- */
Router.post('/addvehicleExpenditure',(req,res)=>{
     //console.log(req.params.id);


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
             console.log(err);
         }else{
             console.log("Added");
             res.redirect('/index');
          }
         })
})

/*---------------------Show Fuel Expenditure----------------------------------------------- */

/*
Router.get('/index',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
        
        res.render('index',{
            employee: docs
        })
    })
})
*/

/*
Router.get('/index',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
        
        res.render('index',{
            employee: docs
        })
    })
})
*/


Router.get('/fuelExpenditure',(req,res)=>{

    
    CostV.find((err,docs)=>{
        if(err) throw err;

        console.log(docs);
        res.render('fuelExpenditure',{
            expenditure: docs
        })
        
   }) 
})

/*
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

*/

Router.get('/perEmployeeExpenditure/:id/:Employee_ID',(req,res)=>{
    console.log(req.params.id);
    let Employee= req.params.Employee_ID;
    console.log(Employee);

    //console.log(CostV.find({"Employee" : "E02387"}));

    


    
    CostV.find({"Employee" : "Employee"},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
            res.render('perEmployeeExpenditure',{expenditure:docs})
        }
    })
    
    





    /*
    CostV.find((err,docs)=>{
        if(err) throw err;

        console.log(docs);
        res.render('perEmployeeExpenditure',{
            expenditure: docs
        })
        
   }) 
   */
})









module.exports= Router;



/*
<% for(var i=0; i< employee.length; i++) {%>
<tr>
  <th scope="row"><%= expenditure[i].EmployeeId%></th>
  <th scope="col"><%= expenditure[i].Name%></th>
  <th scope="col"><%= expenditure[i].Salary%></th>
  <th scope="row"><%= expenditure[i].Vehicles%></th>
  <th scope="col"><%= expenditure[i].Vehicle_type%></th>
  <th scope="col"><%= expenditure[i].Vehicle_no%></th>
  <th scope="col"><%= expenditure[i].Month%></th>
  <th scope="col"><%= expenditure[i].Fuel_type%></th>
  <th scope="col"><%= expenditure[i].Meter_start%></th>
  <th scope="col"><%= expenditure[i].Meter_end%></th>
  <th scope="col"><%= expenditure[i].Traversal_perday_KM%></th>
  <th scope="col"><%= expenditure[i].Fuel_entered_perday%></th>
  <th scope="col"><%= expenditure[i].Days_count%></th>
  <th scope="col"><%= expenditure[i].Perday_cost%></th>
  <th scope="col"><%= expenditure[i].Monthly_cost%></th>

  <th>
    <a href="" class="btn border-shadow update">
      <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
  </a>
  <a href="" name="deleteBtn" class="btn border-shadow delete" href="" > 
      <span class="text-gradient"><i class="fas fa-times"></i></span>
  </a>
  </th>

</tr>
<% } %>

*/