import { Router } from 'express';
import { employeeTestRoute, employeeId, employeeDetailsForEmployees } from '../controllers/employeeController';
import { authenticateEmployeeJWTToken } from '../middleware/employeeAuthMiddleware';

const router = Router();

router.get('/employeeTest', authenticateEmployeeJWTToken, employeeTestRoute);
router.get('/employeeId', authenticateEmployeeJWTToken, employeeId);
router.get('/employeeDetails', authenticateEmployeeJWTToken, employeeDetailsForEmployees);

export default router;
