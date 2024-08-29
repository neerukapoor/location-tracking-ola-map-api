"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminEmployeeController_1 = require("../controllers/adminEmployeeController");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
const router = (0, express_1.Router)();
// router.get('/locations/:userId', authenticateJWTToken, getLocations);
router.post('/registerEmployee', adminAuthMiddleware_1.authenticateJWTToken, adminEmployeeController_1.registerEmployee);
router.get('/showEmployee', adminAuthMiddleware_1.authenticateJWTToken, adminEmployeeController_1.showAllEmployees);
router.get('/name', adminAuthMiddleware_1.authenticateJWTToken, adminEmployeeController_1.loggedInAdmin);
router.get('/employeeDetails', adminAuthMiddleware_1.authenticateJWTToken, adminEmployeeController_1.employeeDetails);
router.get('/locationHistory', adminAuthMiddleware_1.authenticateJWTToken, adminEmployeeController_1.getLocationHistory);
exports.default = router;