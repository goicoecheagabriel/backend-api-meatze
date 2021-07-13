import { Request, RequestHandler } from 'express'

export const isValidRole: RequestHandler= (req:Request | any, res,next)=>{
    
    try {
        // console.log(req.user);
        if(req.user.tipo === 'ADMIN')
        {
            return next();
        }

        return res.status(403).json({ message: 'Access unauthorized' });
    
    } catch (error) {
    return res.status(500).json({ error: error.message });
        
    }
}

