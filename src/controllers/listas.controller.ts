import { RequestHandler } from "express";
import ModeloLista from "./../models/Listas.models";
import mongoose from "mongoose";
import errors from '../services/errors'

export const getListas: RequestHandler = (req, res) => {
  ModeloLista.find((err, doc) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });
    if (doc.length == 0)
      return res.status(404).json({ message: "Documents not founds" });
    res.status(200).json(doc);
  });
};

export const getLista: RequestHandler = (req, res) => {
  ModeloLista.findById(req.params.id, (err:any, doc:any) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });
    if (!doc) return res.status(404).json({ message: `Document not found` });
    res.status(201).json(doc);
  });
};

export const createLista: RequestHandler = (req, res) => {
  const { nombre, descripcion } = req.body;
  ModeloLista.create(
    {
      _id: new mongoose.Types.ObjectId(),
      nombre,
      descripcion,
    },
    (err, doc) => {
      if (err) return res.status(500).json({ message: `Error: ${err}` });
      res.status(200).json(doc);
    }
  );
};

export const updateLista: RequestHandler = (req, res) => {
  ModeloLista.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true},
    (err, doc) => {
      if (err) return res.status(500).json({ message: `Error: ${err}` });
      if (!doc) return res.status(404).json({ message: `Document not found` });
      console.log(doc);
      res.status(200).json(doc);
    }
  );
};

export const deleteLista: RequestHandler = (req, res) => {
  (ModeloLista.findByIdAndDelete as any)(req.params.id, (err:any, doc:any) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });
    if (!doc) return res.status(404).json({ message: `Document not found` });
    res.status(200).json(doc);
  });
};

export const insertarMultimedia: RequestHandler=(req,res)=>{
  const {multimedia} = req.body;
  
  ModeloLista.findOne({multimedias: {$in: [multimedia]}},(err:any, doc:any)=>{
    if(!doc) {
      ModeloLista.findByIdAndUpdate(req.params.id,{$push:{multimedias:multimedia}},{new: true},(err,docB)=>{
        if(err) return errors.response(res,500,`Error: ${err}`);
        res.status(201).json({message:'Se ha agregado un multimedia',data:docB,multimedia:multimedia})
      })
    }else{
      return errors.response(res,200,`El elemento multimedia que intenta agregar ya existe`);
    }
  })

}

export const eliminarMultimedia: RequestHandler=(req,res)=>{
  const{multimedia} = req.body;
  ModeloLista.findOne({multimedias: {$in: [multimedia]}},(err:any,doc:any)=>{
    if(doc){
      ModeloLista.findByIdAndUpdate(req.params.id,{$pull:{multimedias:multimedia}},(err,docB)=>{
        if(err) return errors.response(res,500,`Error:${err}`);
        res.status(200).json({
          message: `Se ha eliminado el objeto multimedia`,
          data: docB,
          multimediaId: multimedia,
        });
      })
    }else{
      res.status(404).json({message: 'El objeto multimedia que intenta eliminar no existe'})
    }
  })
}
