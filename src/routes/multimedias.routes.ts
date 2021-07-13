import { Router } from 'express'
const router = Router();
import * as multimediaController from '../controllers/multimedias.controllers';
import isValidToken from '../middlewares/validateToken';
import { isValidRole } from '../middlewares/validateRole';

router.get('/multimedias',isValidToken,multimediaController.getMultimedias)
router.get('/multimedias/:id',isValidToken,multimediaController.getMultimedia)
router.post('/multimedias',isValidToken,multimediaController.createMultimedia)
router.put('/multimedias/:id',isValidToken,multimediaController.updateMultimedia)
router.delete('/multimedias/:id',isValidToken,multimediaController.deleteMultimedia)

export default router;