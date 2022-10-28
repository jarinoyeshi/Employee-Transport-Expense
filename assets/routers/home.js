const express=require("express");
const Router= express.Router();
const Club = require('../models/club');



Router.get('/',(err,res)=>{
    res.render('index');
})

Router.get('/addUser',(err,res)=>{
    res.render('addUser');
})
Router.get('/edit',(err,res)=>{
    res.render('edit');
})




// insert data
Router.post('/add',(req,res)=>{
     
    const userid = req.body.userid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phoneNumber= req.body.phoneNumber;
    const email = req.body.email

    //console.log(userid, firstname );

    const club= new Club({
        userid,
        firstname,
        lastname,
        phoneNumber,
        email
    })
    club.save(err=>{
        if(err){
            console.log("errorrr")
        }else{
            res.redirect('/addUser')
        }
    })
})




//find data


Router.post('/',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
        
        res.render('index',{
            employees: docs
        })
    })
})




//update data

Router.get('/edit/:id',(req,res)=>{
    Club.findByIdAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
        if(err){
            console.log("cannot update");
        }else{
            res.render('edit',{studentdata:docs})
        }
    })
})










module.exports= Router;