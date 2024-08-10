import { Router } from 'express';
import { loggedInAdmin, registerEmployee, showAllEmployees } from '../controllers/adminEmployeeController';
import { authenticateJWTToken } from '../middleware/adminAuthMiddleware';

const router = Router();

// router.get('/locations/:userId', authenticateJWTToken, getLocations);
router.post('/registerEmployee', authenticateJWTToken, registerEmployee);
router.get('/showEmployee', authenticateJWTToken, showAllEmployees);
router.get('/name', loggedInAdmin);

export default router;
