const express=require('express');
const routes=require('./routes/index');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
require('dotenv').config({path: 'variables.env'});

//cors permite que un cliente se conecte con otro servidor para el 
//intercambio de recuersos
const cors= require('cors');


//conectar mongo
mongoose.Promise=global.Promise;

mongoose.connect(process.env.DB_URL,{   
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false
});

//crear el servidor
const app=express();

//habilitar bodyparter
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Definir un dominio(s) para recibir peticiones
const whitelist=[process.env.FRONTEND_URL];
const corsOptions={
    origin:(origin,callback) =>{
        //Revisar si la peticion viene de un servidor que esta en whitelist
        const existe=whitelist.some(dominio=> dominio === origin);
        if(existe){
            callback(null,true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

//habilitar cors
app.use(cors(corsOptions));

//rutas de la app
app.use('/',routes());

//carpeta publica
app.use(express.static('uploads'));

const host=process.env.HOST || '0.0.0.0';
const port=process.env.PORT || 5000;

//iniciar app
app.listen(port,host,()=>{
    console.log('el servidor esta funcionando')
});