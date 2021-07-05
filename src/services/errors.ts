import { Response } from "express";

export default {
  response: function (res: Response, codigo: number, mensaje: string | null) {
    res.status(codigo).json({ message: mensaje || "Error" });
  },
  
};
