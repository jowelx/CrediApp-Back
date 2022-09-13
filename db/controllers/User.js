import mongoose from "mongoose";
import { User } from "../models/User.js";
import bcryptjs from 'bcryptjs'
export const addUser =async (req,res)=>{

    console.log("addUSer")
    const data=req.body
    let password =  await bcryptjs.hash(data.password , 12)
    console.log(data)
    let newUser = new User({
        session:"login",
        user: data.user,  
        email:data.email,
        name: data.name,
        password:password ,
        lastName:data.lastName ,
        phone: data.phone,
        avatar:data?.avatar
    })
    let newBussinesUser = new User({
        date:"f",
        serial:"f",
        value:"f",
        type:"zzz"
    })
    
    newUser.save((err,usr)=>{
        err&&res.status(500).send(err.message)
        res.json(usr)
    })

}
export const addUserFaceBook=(req,res)=>{
    const data=req.body
    console.log(data)
   let newUser = new User({
        session:"facebook",
        user: data.name,  
        email:data.email,
        name: data.name,
        password:data.id ,
        lastName:data.familyName ,
        phone: data.phone,
        avatar:data.picture.data.url
    })
    newUser.save((err,usr)=>{
        err&&res.status(500).send(err.message)
        res.json(usr)
    })
}
export const addUserGoogle =(req,res)=>{

    const data=req.body.profileObj
    console.log(data)
    let newUser = new User({
        session:"google",
        user: data.givenName,  
        email:data.email,
        name: data.name,
        password:data.googleId ,
        lastName:data.familyName ,
        phone: data.phone,
        avatar:data.imageUrl
    })
    newUser.save((err,usr)=>{
        err&&res.status(500).send(err.message)
        res.json(usr)
    })
}
export const loginUser=async(req,res)=>{
   
    const user=req.body.user
    console.log(user)
    const UserDB=await User.find({
        session:"login"
    })
    if(UserDB.length===0){
        res.send(404)
    }
    else{
        if( UserDB?.filter(e=>e.email==user.email).length>0){
            UserDB?.filter(e=>e.email==user.email).map(async(i,index) =>{
           //  console.log(await bcryptjs.compare(user.password, i.password)) 
                if (await bcryptjs.compare(user.password, i.password)) {
                  
                   // console.log("contraseña correcta")
                    res.json(i)
                  } 
                else{
                    res.send("password");
                }
            })
        } else{
            res.send("user")
           }

        }
  
    
  
    
}
export const loginUserGoogle=async(req,res)=>{


    const user=req.body.user.profileObj
    console.log("usuario")
    console.log(user)
    const UserDB=await User.find({
        session:"google"
    })
  
    UserDB?.filter(e=>e.email==user.email).length===0?    
    res.send("user")
    :

            UserDB?.filter(e=>e.email==user.email).map((i,index) =>{
           //  console.log(await bcryptjs.compare(user.password, i.password)) 
                if (user.googleId=== i.password) {
                   // console.log("contraseña correcta")
                    res.json(i)
                  } 
                else{
                    res.send("password");
                }
            })
      
        
           
}
export const loginUserFacebook=async(req,res)=>{
    console.log(req.body.user)
    const user=req.body.user
    const UserDB=await User.find({
        session:"facebook"
    })
  
    UserDB?.filter(e=>e.email==user.email).length===0?    
    res.send("user")
    :

            UserDB?.filter(e=>e.email==user.email).map((i,index) =>{
           //  console.log(await bcryptjs.compare(user.password, i.password)) 
                if (user.id=== i.password) {
                   // console.log("contraseña correcta")
                    res.json(i)
                  } 
                else{
                    res.send("password");
                }
            })
      
        
           
}