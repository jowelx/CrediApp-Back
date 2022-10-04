import mongoose from "mongoose";
import { User,BussinesUser,Bounty } from "../models/User.js";
import bcryptjs from 'bcryptjs'
export const addBountyData=async(req,res)=>{
    console.log(req.body)
    const data=req.body
    console.log(data[1].id)
   
    const SearchBounty = await Bounty.findOne({
        id:data[1].id
    })
    if(SearchBounty){
            console.log(SearchBounty)
          let resDB=  Bounty.update({_id:SearchBounty._id},{$set:{
                id_user:data[1].id,
                icome:data[0].icome,
                independent:data[1].independent,
                yearsOfWork:data[0].yearsOfWork,
                couple:data[1].couple,
                contribute:data[1].contribute,
                typeOfLoan:data[1].typeOfLoan    
    }},(err,result)=>{
        err&&res.status(500).send(err.message)
        res.json(result)
    })
           console.log(resDB)
    }else{
    
        
            let newBounty=new Bounty({
                id_user:data[1].id,
                icome:data[0].icome,
                independent:data[1].independent,
                yearsOfWork:data[0].yearsOfWork,
                couple:data[1].couple,
                contribute:data[1].contribute,
                typeOfLoan:data[1].typeOfLoan    
            })
            newBounty.save((err,usr)=>{
                err&&res.status(500).send(err.message)
                res.json(usr)
            })
    }

}
export const addUser =async (req,res)=>{

    console.log("addUSer")
    const data=req.body
    console.log(data[1].country)
    let password =  await bcryptjs.hash(data[0]?.password , 12)
  
    let newUser = new User({
        session:"login",
        user: data[0].user,  
        email:data[0].email,
        name: data[0].name,
        password:password ,
        lastName:data[0].lastName ,
        phone: data[0].phone,
        avatar:data[0]?.avatar,
        country:data[1].country
    })
    newUser.save((err,usr)=>{
        err&&res.status(500).send(err.message)
        res.json(usr)
    })
}
export const addUserBussines=async(req,res)=>{
    const data=req.body
    console.log(data)
    let password =  await bcryptjs.hash(data.password , 12)
    let User=new BussinesUser({
    user:data.user ,
    email:data.email,
    name: data.name,
    password:password,
    lastName:data.lasteName,
    phone: data.phone,
    typeEnterprise:data.typeEnterprise,
    position:data.position,
    rut:data.rut,
    nameEnterprise:data.nameEnterprise,
    confirmed:"false"
    })

    User.save((err,usr)=>{
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
    const bussinesUserDB=await BussinesUser.find({
        email:user.email
    })
    const Buss=[bussinesUserDB?.[0]]
    const UserDB=await User.find({
        session:"login"
    })
    if(UserDB.length===0){
        console.log(UserDB)
        Buss?.map(async(i,index)=>{
            if (await (bcryptjs.compare(user.password, i.password))) {
               
                // console.log("contraseña correcta")
                 res.json(i)
               } 
             else{
                 res.send("password");
             }
        })
    }
    if(UserDB.length>0){
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

                   index===0&& res.json(i)
                  } 
                else{
                    res.send("password");
                }
            })
      
        
           
}