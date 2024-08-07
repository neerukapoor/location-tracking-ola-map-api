import { Router } from 'express';
import { employeeTestRoute, employeeId } from '../controllers/employeeController';
import { authenticateEmployeeJWTToken } from '../middleware/employeeAuthMiddleware';

const router = Router();

router.get('/employeeTest', authenticateEmployeeJWTToken, employeeTestRoute);
router.get('/employeeId', authenticateEmployeeJWTToken, employeeId);

export default router;
