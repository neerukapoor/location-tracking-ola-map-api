import { Router } from 'express';
import { employeeDetails, loggedInAdmin, registerEmployee, showAllEmployees } from '../controllers/adminEmployeeController';
import { authenticateJWTToken } from '../middleware/adminAuthMiddleware';

const router = Router();

// router.get('/locations/:userId', authenticateJWTToken, getLocations);
router.post('/registerEmployee', authenticateJWTToken, registerEmployee);
router.get('/showEmployee', authenticateJWTToken, showAllEmployees);
router.get('/name', authenticateJWTToken, loggedInAdmin);
router.get('/employeeDetails', authenticateJWTToken, employeeDetails);

export default router;
