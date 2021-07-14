import { SSL_OP_EPHEMERAL_RSA } from "constants";
import mongoose from "mongoose";
import User from "../models/Users.models";


module.exports = async function validarUsuarioPorCLI(){
   
   const prompt = require('prompt');

   prompt.stop = function () {
      if (prompt.stopped || !prompt.started) {
          return;
      }
      prompt.emit('stop');
      prompt.stopped = true;
      prompt.started = false;
      prompt.paused = false;
      return prompt;
  }

   prompt.start();
   prompt.message = ('Enter Here');

   await new Promise(resolve => setTimeout(resolve, 3000));

   console.log('***************************************************************************');
   console.log('Bienvenido a la CLI ApiMultimedia.Proceda a ingresar un usuario,por favor.')
   console.log('***************************************************************************');

   prompt.get(['username', 'password','email','tipo'], function (err:any, result:any) {
     if (err) { return onErr(err); }
     validarUsuario(result)
     prompt.stop();
});

function onErr(err:any) {
   console.log(err);
   return 1;
}

function validarUsuario(result:any){
   
   const { username, password, email, tipo} = result;
   
   if(username === ''){
      console.log('El usuario no puede estar vacio')
      validarUsuarioPorCLI();
   }

   if(password === ''){
      console.log('El password no puede estar vacio')
      validarUsuarioPorCLI();
   }

   if(email === ''){
      console.log('El email no puede estar vacio')
      validarUsuarioPorCLI();
   }

   if(tipo === ''){
      console.log('El tipo no puede estar vacio')
      validarUsuarioPorCLI();
   }

   if(tipo !== 'ADMIN' || tipo !== 'USER'){
      console.log('El tipo solo puede ser ADMIN o USER')
      validarUsuarioPorCLI();
   }

   crearUsuario( username, password, email, tipo )
   console.log(`Bienvenido a nuestra base de datos ${result.username}`);
   
   
   } //fin validar usuario

   async function crearUsuario ( username:any, password:any, email:any, tipo:any ){
      
      try {

         const user: any = await User.create({
           userName: username,
           password,
           email, 
           tipo,
           _id: new mongoose.Types.ObjectId(),
         });
         
       } catch (error) {
         console.log('Ha habido un error en la creacion del usuario.El error es de tipo: ' +  error);
         process.exit(0);
       }
   }
}

