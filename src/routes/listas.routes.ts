import { Router } from 'express';
const router = Router();
import * as listasController from '../controllers/listas.controller';
import isValidToken from '../middlewares/validateToken';
import { isValidRole } from '../middlewares/validateRole'; 


router.get('/listas',  isValidToken, listasController.getListas);
router.get('/listas/:id', isValidToken, listasController.getLista);
router.post('/listas', isValidToken,listasController.createLista);
router.put('/listas/:id',isValidToken, listasController.updateLista);
router.delete('/listas/:id', isValidToken,listasController.deleteLista);

// rutas especiales
router.put('/listas/insertarmultimedia/:id',isValidToken,listasController.insertarMultimedia);
router.put('/listas/eliminarmultimedia/:id',isValidToken,listasController.eliminarMultimedia);

export default router;
