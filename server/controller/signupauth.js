const UserData = require('../models/registeredUser');


const UniqueInputAuth = (req,res,next)=>{
    UserData.find({username:req.body.username})
    .then((data)=>{
       
        if(data.length !== 0 ){
           return res.json({error:'Already registered User'})
        }else{
            next()
        }
    })
}
module.exports = UniqueInputAuth;