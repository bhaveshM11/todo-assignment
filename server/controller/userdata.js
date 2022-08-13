const bcrypt = require('bcryptjs');
const UserData = require('../models/registeredUser');


const postUserData = async (req,res)=>{
    const {username,password,confirmPassword} = req.body;
    if(password === confirmPassword){
        const passwordHash = await bcrypt.hash(password,10);
        UserData.create({username,password:passwordHash})
        .then((data)=>{
            res.status(200).json({message:'Successfully Registered User !!',data})
        })
        .catch(()=>{res.json({error:"Failed to Registered"})})
    }else{
        res.json({message:"passwords didn't Match"})
    }
  
}
module.exports = postUserData;