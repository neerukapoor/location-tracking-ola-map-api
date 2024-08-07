import { Router } from 'express';
import { login } from '../controllers/employeeAuthController';

const router = Router();

router.post('/login', login);

export default router;
