import {Router} from 'express';
const router = Router();
import * as userController from '../controllers/users.controller';
import isValidToken from '../middlewares/validateToken';
import {isValidRole} from '../middlewares/validateRole';

router.get('/usuarios', isValidToken, isValidRole, userController.getUsuarios);
router.get('/usuarios/:id', isValidToken,  isValidRole, userController.getUsuario);
router.put('/usuarios/:id', isValidToken,  isValidRole, userController.updateUsuario);
router.delete('/usuarios/:id', isValidToken,  isValidRole, userController.deleteUsuario);


router.post('/usuarios/signup', isValidToken,  isValidRole, userController.signup);//registrarse

router.post('/usuarios/signin',userController.signin); //logearse




export default router;