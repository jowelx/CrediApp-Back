import mongoose from 'mongoose'
//se defines la estructura de los datos del usuario
const Schema = mongoose.Schema

const UserSchema = new Schema({
    session:{type:String},
    user:{type:String} ,  
    email:{type:String},
    name:{type:String} ,
    password: {type:String},
    lastName: {type:String},
    phone: {type:String},
    avatar:{type:String}
})
export const User = mongoose.model('User',UserSchema )

const BussinesUserSchema = new Schema({
    name:{type:String},
    lastName:{type:String},
    company:{type:String},
    position:{type:String},
    adress:{type:String},
    email:{type:String},
    typeCompany:{type:String},
    confirmed:{type:Boolean}
})
export const BussinesUser=mongoose.model("BussinesUser",BussinesUserSchema)