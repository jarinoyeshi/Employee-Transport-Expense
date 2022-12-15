const express= require('express');
const routhPath= express.Router();

// defining the path of function page
const render= require('../routers/render');
const controller= require('../routers/controller');

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
routhPath.get('/login',render.loginmethod);
routhPath.get('/logout',render.logout);
routhPath.get('/',render.showData);

/*----User-------*/ 
routhPath.get('/add-User',render.addUser);
routhPath.get('/addUserFromExcel',render.add_User_From_Excel);


/*
routhPath.get('/editUser',render.edit_user);
routhPath.get('/deleteUser',render.delete_user);
*/
/*----Admin----- */
routhPath.get('/add-Admin',render.addAdmin);
/*
routhPath.get('/editAdmin',render.editAdmin);
routhPath.get('/deleteAdmin',render.deleteAdmin);
*/
/*---Expenditure----*/ 
routhPath.get('/add-Vehicle-Expenditure',render.addVehicleExpenditure);
routhPath.get('/fuelExpenditure',render.show_fuel_Expenditure);

routhPath.get('/generate_transport_pdf',render.generatePDF);

//api for function
routhPath.post('/api/users', controller.createUser);
routhPath.post('/api/users', controller.createAdmin);
routhPath.post('/api/users', controller.createVehicleExpenditure);
//routhPath.get('/api/users', controller.find);
//routhPath.put('/api/users/:id', controller.update);
//routhPath.delete('/api/users/:id', controller.delete);


module.exports= routhPath;
