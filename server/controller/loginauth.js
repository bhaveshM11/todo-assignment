const jwt = require('jsonwebtoken');
const UserData = require('../models/registeredUser');
const bcrypt = require('bcryptjs');

const loginAuth = async (req,res,next)=>{
    const {username,password} = req.body;
   
        UserData.find({username:username})
        .then((data)=>{
            if(data.length !== 0){
                bcrypt.compare(password,data[0].password)
                .then((passwordMatch)=>{
                    if(passwordMatch){
                      const token =  jwt.sign({username:data[0].username},process.env.SECRET_KEY);
                            res.json({token,message:"Successfully Logged In",username:data[0].username});
                    }else{
                        return res.json({message:'Incorrect password !'})
                    }
                })
                
            }else{
                return res.json({message:'Invalid Username !!'})
            }
        })
    }
module.exports = loginAuth;