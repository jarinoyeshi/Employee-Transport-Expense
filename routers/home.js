
const express=require("express");
const Router= express.Router();
const Club = require('../models/club');
var XLSX       = require('xlsx');
var multer     = require('multer');
var mongoose   = require('mongoose');







Router.get('/',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
        res.render('index',{
            employee: docs
        })
    })
    
})



//var pdf = require("pdf-creator-node");
//var fs = require("fs");

// Read HTML Template





//html to pdf required things
const ejs = require('ejs');
const pdf = require('html-pdf');
var fs = require('fs');
const path = require('path');
//import {_dirname} from 'path' ; 

/*
const generatePDF = async (req, res, next) => {

    Club.find((err,docs)=>{
        if(err) throw err;
        res.render('transport_pdf',{
            employee: docs
        })
    })

}

*/

console.log(__dirname,'home.js')
const generatePDF = async (req, res, next) => {

    try{
        const employee=await Club.find();
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
        });

        

    }catch(error){
        console.log("catch "+error.message)

    }
}



/*
Router.get('/transport_pdf',(req,res)=>{
    const users=  Club.find({"Employee_ID":"E04332"});
    console.log(users)
    res.render('transport_pdf',{
        employee: users
    })
    
})
*/


/*
Router.get('/transport_pdf',(req,res)=>{
    const users=  Club.find({});
    console.log(users)
    res.render('transport_pdf',{
        employee: users
    })
    
})
*/





module.exports= Router;
Router.get('/generate_transport_pdf',generatePDF);
//Router.get('/',generatePDF);

/*
module.exports = {
    Router,
    generatePDF
}
*/