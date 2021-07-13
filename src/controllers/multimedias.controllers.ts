import { Response, Request, RequestHandler } from "express";
import Multimedia from "../models/Multimedias.models";
import mongoose from "mongoose";
import errors from '../services/errors'

export const getMultimedias: RequestHandler = async (req: Request, res: Response) => {
  try {
    const docs = await Multimedia.find();

    if (docs.length == 0) {
      return res.status(404).json({ message: "Documents not found" });
    }
    res.status(200).json(docs);
  } catch (error) {
   errors.response(res,500,`Error: ${error}`);
  }
};

export const getMultimedia: RequestHandler = async (req: Request, res: Response) => {
  try {
    const doc = await Multimedia.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(doc);
  } catch (error) {
    errors.response(res,500,`Error: ${error}`);
  }
};

export const createMultimedia: RequestHandler = async (req: Request, res: Response) => {
  try {
    const doc = await new Multimedia({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    }).save();

    res.status(201).json(doc);
  } catch (error) {
    errors.response(res,500,`Error: ${error}`);
  }
};

export const updateMultimedia: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const docUpdated = await Multimedia.findByIdAndUpdate(id, req.body, {
      new: true,runValidators:true
    });
    if (!docUpdated) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(201).json(docUpdated);
  } catch (error) {
    errors.response(res,500,`Error: ${error}`);
  }
};

export const deleteMultimedia: RequestHandler = async (req: Request, res: Response) => {
  try {

   const docDeleted = await Multimedia.findByIdAndDelete(req.params.id);

   if(!docDeleted) {
    return res.status(404).json({ message: "Document not found" });
}
   res.status(200).json(docDeleted);

  } catch (error) {
    errors.response(res,500,`Error: ${error}`);
  }
};
