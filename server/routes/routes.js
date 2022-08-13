const express = require('express')
const router = express.Router();
const jwt=require("jsonwebtoken")

const signUpAuth = require('../controller/signupauth');
const loginAuth = require('../controller/loginauth')
const postUserData = require('../controller/userdata');
const ItemList = require('../models/items')

router.post('/register',signUpAuth, postUserData)

router.post('/login',loginAuth)

router.get('/todoList',(req,res)=>{
    if(req.headers.authorization){
        const {username} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        ItemList.find({username})
        .then((data)=>{
            if(data.length === 0){
                res.json({message:'No Data found'})
            }else{
                res.json({data:data[0].items})
            }
            
        })
    }
})

router.post('/todoList',(req,res)=>{
    const updatedArr = req.body.data;
    if(req.headers.authorization){
        const {username} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        ItemList.find({username})
        .then((data)=>{
            if(data.length === 0){
                ItemList.create({username:username,items:updatedArr})
                .then((dat)=>{
                    res.json({message:'Created list'})
                }).catch(()=>{console.log('Not able to create list')})
            }else{
                ItemList.updateOne({username:username},{$set:{items:updatedArr}})
                .then((data)=>{
                    res.json({message:'Updated list'})
                })
                .catch(()=>{console.log('unable to update list')})
            }
        })
    }   
    

})





router.get('/',(req,res)=>{
    res.send("Welcome to Base Page")
})



module.exports = router;


