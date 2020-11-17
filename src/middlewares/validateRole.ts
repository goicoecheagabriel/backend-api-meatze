import {Request, RequestHandler} from 'express'

export const isValidRole: RequestHandler= (req:Request | any, res,next)=>{
    
    try {
        console.log(req.user);
       // console.log(req.user,'esto es el nuevo');
    if(req.user.tipo === 'ADMIN'){
        console.log(req.user,'esto es el nuevo');
        return next();
    }
    
    // if(!req.user){
    //     return res.status(403).json({ message: 'Access unauthorized.You must provide a Token' });
    // }

    return res.status(403).json({ message: 'Access unauthorized' });
    
} catch (error) {
    return res.status(500).json({ error: error.message });
        
    }
}

