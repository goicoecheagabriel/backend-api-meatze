import mongoose from "mongoose";
import User from "../models/Users.models";

module.exports = function saludo(){
   
   const prompt = require('prompt');
    prompt.start();

    console.log('<br >')

    prompt.get(['username', 'password','email','tipo'], function (err:any, result:any) {
    if (err) { return onErr(err); }
    console.log('Datos recibidos por linea de comando:');
    
   /*  console.log('  Username: ' + result.username);
   console.log('  Password: ' + result.password);
    console.log('  Email: ' + result.email);
    console.log('  Tipo: ' + result.tipo); */
    
    validarUsuario(result)
});

function onErr(err:any) {
   console.log(err);
   return 1;
}

function validarUsuario(result:any){
   console.log(result.username, "Hola soy el creador")
   const { username, password, email, tipo} = result;
   
   if(username === ''){
      console.log('El usuario no puede estar vacio')
      saludo();
   }

   if(password === ''){
      console.log('El password no puede estar vacio')
      saludo();
   }

   if(email === ''){
      console.log('El email no puede estar vacio')
      saludo();
   }

   if(tipo === '' && (email === 'ADMIN' || email === 'USER') ){
      console.log('El tipo no puede estar vacio y solo puede ser ADMIN o USER')
      saludo();
   }

   crearUsuario( username, password, email, tipo )
   //crearUsuario()
   
   }

   function crearUsuario ( username:any, password:any, email:any, tipo:any ){
      
      try {

         const user: any = User.create({
           userName: username,
           password,
           email, 
           tipo,
           _id: new mongoose.Types.ObjectId(),
         });
     
         
       } catch (error) {
         console.log('Ha habido un error en la creacion del usuario. Intenteló más tarde... :(')
       }
   }

}

