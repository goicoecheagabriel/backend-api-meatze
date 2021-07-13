import { Router } from 'express';
const router = Router();
import * as pantallasController from '../controllers/pantallas.controller';
import isValidToken from '../middlewares/validateToken';
import { isValidRole } from '../middlewares/validateRole';

/*Cuando se llama a un archivo se puede traer sin desestructurar solo la que este exportada por default */

router.get('/pantallas', isValidToken, pantallasController.getPantallas);
router.get('/pantallas/:id', isValidToken, pantallasController.getPantalla);
router.post('/pantallas', isValidToken, isValidRole, pantallasController.createPantalla);
router.put('/pantallas/:id', isValidToken, pantallasController.updatePantalla);
router.delete('/pantallas/:id', isValidToken,  isValidRole, pantallasController.deletePantalla);

// rutas especiales
router.put('/pantallas/insertarlista/:id', isValidToken, pantallasController.insertarLista);
router.put('/pantallas/eliminarlista/:id', isValidToken, pantallasController.eliminarLista);


export default router;