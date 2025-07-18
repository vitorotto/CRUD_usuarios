import { Router } from 'express';
import * as UserController from '../controllers/userController'

const router = Router();

// Criar usuário
router.post('/create', UserController.createUser);

// Listar todos os usuários
router.get('/list', UserController.listUsers);

// Editar um usuário
router.put('/edit/:id', UserController.editUsers);

// Deletar um usuário
router.delete('/delete/:id', UserController.deleteUser);

export default router;

