"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationHistory = exports.employeeDetails = exports.loggedInAdmin = exports.showAllEmployees = exports.registerEmployee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Employee_1 = __importDefault(require("../models/Employee"));
const zod_1 = __importDefault(require("zod"));
const Admin_1 = __importDefault(require("../models/Admin"));
const Location_1 = __importDefault(require("../models/Location"));
// Function to generate a random string of given length
const generateRandomString = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        randomString += charset.charAt(Math.floor(Math.random() * n));
    }
    return randomString;
};
// Function to generate a random password of length 5 to 7
const generatePassword = () => {
    const length = Math.floor(Math.random() * 3) + 5; // Generates a length between 5 and 7
    return generateRandomString(length);
};
// Function to generate a random unique ID of length 5 to 7
const generateUniqueId = () => {
    const length = Math.floor(Math.random() * 3) + 5; // Generates a length between 5 and 7
    return generateRandomString(length);
};
const inputZodValidation = zod_1.default.object({
    username: zod_1.default.string().min(3).max(30),
    mobileNumber: zod_1.default.string()
        .regex(/^[0-9]{10}$/, "Invalid mobile number")
});
const registerEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, mobileNumber } = req.body;
        const adminId = req.headers.id;
        if (!adminId || !mongoose_1.default.Types.ObjectId.isValid(adminId.toString())) {
            return res.status(400).json({ message: "Invalid Admin ID" });
        }
        // Check if employee already exists
        const existingEmployee = yield Employee_1.default.findOne({ mobileNumber });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists" });
        }
        // Generate unique ID and password
        const uniqueId = generateUniqueId();
        const password = generatePassword();
        // Create new employee
        const newEmployee = new Employee_1.default({
            adminId: new mongoose_1.default.Types.ObjectId(adminId.toString()),
            name,
            mobileNumber,
            uniqueId,
            password
        });
        // Save employee to database
        yield newEmployee.save();
        // Send response with the new employee's credentials
        res.status(201).json({
            message: "Employee registered successfully",
            employee: {
                uniqueId,
                password
            }
        });
    }
    catch (error) {
        console.error("Error registering employee:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.registerEmployee = registerEmployee;
const showAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee_1.default.find({}, 'name uniqueId password');
        const employeeDetails = employees.map(employee => ({
            name: employee.name,
            uniqueId: employee.uniqueId,
            password: employee.password
        }));
        res.status(200).json({
            employees: employeeDetails
        });
    }
    catch (error) {
        console.error("Error retrieving employees:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.showAllEmployees = showAllEmployees;
const loggedInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.headers.id;
        const adminName = yield Admin_1.default.findOne({ adminId });
        if (!adminName)
            return res.status(400).json({ message: 'Admin Name not found' });
        res.status(200).send(adminName.adminname);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error while fetching loged in Admin details', error: err.message });
    }
});
exports.loggedInAdmin = loggedInAdmin;
const employeeDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId } = req.query;
        if (!uniqueId) {
            return res.status(400).json({ message: "Unique ID is required" });
        }
        const employee = yield Employee_1.default.findOne({ uniqueId: uniqueId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        console.log("neeru in adminEmployeeController " + uniqueId);
        console.log("neeru in adminEmployeeController - " + employee.name);
        return res.status(200).json({
            id: employee.id,
            name: employee.name,
            uniqueId: employee.uniqueId,
            mobileNumber: employee.mobileNumber
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error while fetching employee detail.', error: err.message });
    }
});
exports.employeeDetails = employeeDetails;
const getLocationHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, date } = req.query;
        if (!employeeId || !date) {
            return res.status(400).json({ message: 'Employee ID and date are required.' });
        }
        const locationHistory = yield Location_1.default.findOne({ employeeId, date }).exec();
        if (!locationHistory) {
            return res.status(404).json({ message: 'No location history found for this date.' });
        }
        return res.json(locationHistory);
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.getLocationHistory = getLocationHistory;
