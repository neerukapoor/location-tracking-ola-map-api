"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateEmployeeJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateEmployeeJWTToken = (req, res, next) => {
    const accessToken = req.header("jwtToken");
    if (accessToken) {
        if (!process.env.JWT_SECRET)
            return res.status(403).json({ message: "Please provide token" });
        jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ message: "Got Authentication Error " + err });
            }
            if (!data) {
                return res.status(403).json({ message: "Got Authentication Error, data is undefined" });
            }
            if (typeof data === "string")
                return res.status(403).json({ message: "Got Authentication Error, data is of type string" });
            req.headers["id"] = data.employee.id;
            next();
        });
    }
    else {
        res.status(404).json({ message: "Please Provide Jwt token" });
    }
};
exports.authenticateEmployeeJWTToken = authenticateEmployeeJWTToken;
