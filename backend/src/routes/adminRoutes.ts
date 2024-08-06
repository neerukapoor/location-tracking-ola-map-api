import { Router } from 'express';
import { registerEmployee, showAllEmployees } from '../controllers/adminEmployeeController';
import { authenticateJWTToken } from '../middleware/adminAuthMiddleware';

const router = Router();

// router.get('/locations/:userId', authenticateJWTToken, getLocations);
router.post('/registerEmployee', authenticateJWTToken, registerEmployee);
router.post('/showEmployee', authenticateJWTToken, showAllEmployees);

export default router;
