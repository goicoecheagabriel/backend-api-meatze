import { Router } from 'express';
const router = Router();
import * as userController from '../controllers/users.controller';
import isValidToken from '../middlewares/validateToken';
import { isValidRole } from '../middlewares/validateRole';

// solo pueden hacer peticiones GET,PUT & DELETE un ADMIN con TOKEN válido
router.get('/usuarios', isValidToken, isValidRole, userController.getUsuarios);
router.get('/usuarios/:id', isValidToken,  isValidRole, userController.getUsuario);
router.put('/usuarios/:id', isValidToken,  isValidRole, userController.updateUsuario);
router.delete('/usuarios/:id', isValidToken,  isValidRole, userController.deleteUsuario);

//SOLO PUEDE REGISTRAR UN ADMIN CON UN TOKEN VÁLIDO,DE AHI LOS MIDDLEWARES EN EL SING UP
router.post('/usuarios/signup', isValidToken,  isValidRole, userController.signup);

// AUNQUE EL ENDPOINT ESTÉ ABIERTO TIENE QUE PASAR LAS REGLAS DE ACCESO -> LA INFO VA POR POST
router.post('/usuarios/signin',userController.signin);

export default router;