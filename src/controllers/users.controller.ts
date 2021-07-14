import { Response, Request, RequestHandler } from "express";
import mongoose from "mongoose";
import User from "../models/Users.models";
import jwt from 'jsonwebtoken';
import { sistema } from '../config/config';

// GET a '/api/usuarios'
export const getUsuarios: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (users.length == 0) {
      return res.status(404).json({ message: `No users found` });
    }

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};
// GET a '/api/usuarios/MongoID
export const getUsuario: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: `No user found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};
// POST a '/api/usuarios/signup -> debe hacerlo un ADMIN con un TOKEN válido
export const signup: RequestHandler = async (req: Request, res: Response) => {
  try {

    const user: any = await User.create({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });

    res.status(201).json(user);
    
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};

// update por PUT a /api/usuarios/mondoID
export const updateUsuario: RequestHandler = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      projection: { password: 0 },
    });
    if (!updatedUser) {
      return res.status(404).json({ message: `User not found for update` });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
   
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
//delete por DELETE a /api/usuarios/mongoID
export const deleteUsuario: RequestHandler = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id, {
      projection: { password: 0 },
    });
    if (!deletedUser) {
      return res.status(404).json({ message: `User not found for delete` });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// Se busca el username único,se comprueba su password y se le envía un token de 1 día
export const signin: RequestHandler = async (req: Request, res: Response) => {

 try {

  const unauthorized = ()=>  res.status(403).json({ok: false,message: 'Unauthorizated.Password or user incorrects'});

  const { userName,password } = req.body;

  const userFound = await User.findOne({ userName});
         console.log(userFound)   

  if(userFound) {
     const passwordValid = await userFound.comparePassword(password,userFound.password);

     if(passwordValid) {
       //se puede montar el payload con lo que se quiera,al decodificar se devolverá ese payload
       const token = jwt.sign({id:userFound.id,email:userFound.email,tipo:userFound.tipo},sistema.jwtSECRET,{
         expiresIn:86400
       })
       // console.log(token);
       res.status(200).json({ok: true,token:token})
     }else{
       unauthorized(); //si no coinciden las passwords proporcionada y almacenada
     }
  }else{
    unauthorized(); //si no se encuentra un user en la BD con el userName proporcionado
  }
  
 } catch (error) {
  res.status(500).json({ message: `Error: ${error.message}` });
 }

}

