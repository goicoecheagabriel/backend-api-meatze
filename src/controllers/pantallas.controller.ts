import { RequestHandler } from "express";
import mongoose from "mongoose";
import ModeloPantalla from "../models/Pantallas.models";
import errors from '../services/errors';


export const getPantallas: RequestHandler = (req: Request | any, res) => {
  ModeloPantalla.find((err, doc) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });
    if (doc.length == 0)
      return res.status(404).json({ message: `No documents found` });

    res.status(200).json(doc);
  });
};

export const getPantalla: RequestHandler = (req, res) => {
  ModeloPantalla.findById(req.params.id, (err:any, doc:any) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });
    if (!doc) return res.status(404).json({ message: `No document found` });
    res.status(200).json(doc);
  });
};

export const createPantalla: RequestHandler = (req, res) => {
  ModeloPantalla.create(
    { ...req.body, _id: new mongoose.Types.ObjectId() },
    (err: any, doc: any) => {
      if (err) {
        return errors.response(res, 500, `Error: ${err}`);
      }
       res.status(201).json(doc);  

    }
  );
};

export const updatePantalla: RequestHandler = (req, res) => {
  const { id } = req.params;
  ModeloPantalla.findByIdAndUpdate(id, req.body, { new: true,runValidators:true }, (err, doc) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });
    if (!doc) return res.status(404).json({ message: `Document not found` });
    res.status(200).json(doc);
  });
};

export const deletePantalla: RequestHandler = (req, res) => {
  const { id } = req.params;
  (ModeloPantalla.findByIdAndDelete as any)(id, (err:any, doc:any) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });
    if (doc == null) {
      return res
        .status(404)
        .json({ message: "Documento no encontrado con ese id" });
    }
    res.json(doc);
  });
};

export const insertarLista: RequestHandler = (req, res) => {
  /**---------------------------------------------------------- */
  const { id } = req.params;
  const { lista } = req.body;
  //$in lleva un array de valores, y $nin¿?
  ModeloPantalla.findOne({ listas: { $in: [lista] } }, (err:any, doc:any) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });

    if (!doc) {
      ModeloPantalla.findByIdAndUpdate(
        id,
        { $push: { listas: lista } },
        { new: true, runValidators: true },
        (err, docLista) => {
          if (err) return res.status(500).json({ message: `Error: ${err}` });

          if (docLista == null) {
            return res
              .status(404)
              .json({ message: "Documento no encontrado con ese id" });
          }
          res.status(200).json({
            message: `Se ha agregado la lista`,
            data: docLista,
            listaId: lista,
          });
        }
      );
    } else {
      res
        .status(200)
        .json({ message: `La lista que intenta agregar ya existe` });
    }
  });
};

export const eliminarLista: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { lista } = req.body;

  ModeloPantalla.findOne({ listas: { $in: [lista] } }, (err:any, doc:any) => {
    if (err) return res.status(500).json({ message: `Error: ${err}` });

    if (doc) {
      ModeloPantalla.findByIdAndUpdate(
        id,
        { $pull: { listas: lista } },
        { new: true, runValidators: true },
        (err, docUpdated) => {
          if (err) return res.status(500).json({ message: `Error: ${err}` });
 
          res.status(200).json({
            message: `Se ha eliminado la lista`,
            data: docUpdated,
            listaId: lista,
          });
        }
      );
    } else {

      res
        .status(404)
        .json({ message: `La lista que intenta eliminar no existe` });
    }
  });
};
