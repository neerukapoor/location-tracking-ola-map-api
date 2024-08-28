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
exports.employeeDetailsForEmployees = exports.employeeId = exports.employeeTestRoute = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const employeeTestRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Employee Controller Working fine");
});
exports.employeeTestRoute = employeeTestRoute;
const employeeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = req.headers["id"];
    res.send(employeeId);
});
exports.employeeId = employeeId;
const employeeDetailsForEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId } = req.query;
        if (!uniqueId) {
            return res.status(400).json({ message: "Unique ID is required" });
        }
        const employee = yield Employee_1.default.findOne({ uniqueId: uniqueId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        console.log("neeru in employeeController " + uniqueId);
        console.log("neeru in employeeController - " + employee.name);
        return res.status(200).json({
            id: employee.id,
            name: employee.name,
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error while fetching employee details for employee.', error: err.message });
    }
});
exports.employeeDetailsForEmployees = employeeDetailsForEmployees;
