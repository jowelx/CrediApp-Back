import mongoose from 'mongoose'
//se defines la estructura de los datos del usuario
const Schema = mongoose.Schema
const BountrySchema =new Schema({
    id_user:{type:String},
    icome:{type:String},
    independent:{type:String},
    yearsOfWork:{type:String},
    couple:{type:String},
    contribute:{type:String},
    typeOfLoan:{type:Array}
})
export const Bounty = mongoose.model('Bounty',BountrySchema )
const UserSchema = new Schema({
    session:{type:String},
    user:{type:String} ,  
    email:{type:String},
    name:{type:String} ,
    password: {type:String},
    lastName: {type:String},
    phone: {type:String},
    avatar:{type:String},
    country:{type:String}
})
export const User = mongoose.model('User',UserSchema )

const BussinesUserSchema = new Schema({
    user:{type:String} ,
    email:{type:String},
    name:{type:String} ,
    password:{type:String} ,
    lastName:{type:String},
    phone:{type:String} ,
    typeEnterprise: {type:String},
    position: {type:String},
    rut:{type:String} ,
    nameEnterprise:{type:String},
    confirmed:{type:String}
})
export const BussinesUser=mongoose.model("BussinesUser",BussinesUserSchema)