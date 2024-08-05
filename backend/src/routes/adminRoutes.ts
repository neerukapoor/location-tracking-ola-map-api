import { Router } from 'express';
import { registerEmployee } from '../controllers/adminRegisterEmployeeController';
import { authenticateJWTToken } from '../middleware/adminAuthMiddleware';

const router = Router();

// router.get('/locations/:userId', authenticateJWTToken, getLocations);
router.post('/registerEmployee', authenticateJWTToken, registerEmployee);

export default router;
