import { RequestHandler, Response, Request } from "express";
import mongoose from "mongoose";
import { IUser } from "../models/Users.models";
import User from "../models/Users.models";
import jwt from 'jsonwebtoken';
import {sistema} from '../config/config';


export const getUsuarios = async (req: Request, res: Response) => {
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

export const getUsuario = async (req: Request, res: Response) => {
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
//Registrarse
export const signup = async (req: Request, res: Response) => {
  try {

    const user: any = await User.create({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });

    const { _id, userName, email, tipo, password } = user;
    const user2 = { userName, email, tipo, _id, password };
    delete user2.password;
    res.status(201).json(user2);
    
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      projection: { password: 0 },
    });
    if (!updatedUser) {
      return res.status(404).json({ message: `User not found` });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
   
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
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

// LogIn
export const signin = async (req: Request, res: Response) => {

 try {

  const unauthorized = ()=>  res.status(403).json({ok: false,message: 'Unauthorizated.Password or user incorrects'});

  const {userName,password} = req.body;

  const userFound = await User.findOne({ userName});
         console.log(userFound)   

  if(userFound) {
     const passwordValid = await userFound.comparePassword(password,userFound.password);
    // console.log(userFound); sigue siendo igual
     if(passwordValid) {
     //se puede montar el payload con lo que se quiera,al decodificar se devolverá lo mismo
      const token = jwt.sign({id:userFound.id,email:userFound.email,tipo:userFound.tipo},sistema.jwtSECRET,{
        expiresIn:86400
      })
      console.log(token);
      res.status(200).json({ok: true,token:token})
     }else{
       unauthorized()
     }
  }else{
    unauthorized();
  }
  
 } catch (error) {
  res.status(500).json({ message: `Error: ${error.message}` });
 }

  }//fin signin

