import jwt from "jsonwebtoken";
import { sistema } from "../config/config";
import { RequestHandler } from "express";

const isValidToken: RequestHandler = (req: Request | any, res, next) => {
  try {
    let token = "";
    let authorization = req.headers["authorization"] || [];
    if(authorization.length > 20){
     token = req.headers["authorization"]
      ? req.headers["authorization"].replace("Bearer ", "")
      : undefined;
        // console.log(token);

        if (typeof token ==  "string") {
            const decodedToken = jwt.verify(token, sistema.jwtSECRET);
          // console.log(decodedToken);
            req.user = decodedToken;
          }
        }else{
          return res.status(403).json({message:"you must provide a token"})
        }
 
     next();
    } catch (error) {
       // console.log(req.headers["authorization"])
       return res.status(500).json({ error: error.message });

  }
};

export default isValidToken;
