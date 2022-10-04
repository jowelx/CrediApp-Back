import express from'express';
import morgan from'morgan';
import moongose from'mongoose';
import cors from 'cors'
import Main from './routes/main.routes.js'
import {ERROR_CONNECTION,SUCCESFULL_CONNECTION ,SERVER}from './src/constants/Text.js'
import bodyParser from 'body-parser';
import Dotenv from 'dotenv'

const uri = "mongodb+srv://db-ark-trac:db-ark-trac@cluster0.df8hk.mongodb.net/CrediApp?retryWrites=true&w=majority";

const app =express();
//setting
Dotenv.config()
app.use(cors(/*options*/));
app.set('port', process.env.PORT || 4000)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use('/CrediApp/api',Main)
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());
//Initialization of database connection and server
moongose.connect(
    uri,
    {useNewUrlParser:true},
    (err,res)=>{
        err 
        ? 
        [console.log(ERROR_CONNECTION),
        console.log(err)]
        :
        console.log(SUCCESFULL_CONNECTION )
        //starting the server
        app.listen(app.get('port'), () => {
            console.log(SERVER + " "+app.get('port'));
          })
    }
)
