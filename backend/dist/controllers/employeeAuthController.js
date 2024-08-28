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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const Employee_1 = __importDefault(require("../models/Employee"));
const loginCredentialSyntax = zod_1.default.object({
    uniqueId: zod_1.default.string().min(3).max(30),
    password: zod_1.default.string()
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedInput = loginCredentialSyntax.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(411).json({ msg: parsedInput.error });
        }
        const input = req.body;
        const uniqueId = input.uniqueId;
        const password = input.password;
        const employee = yield Employee_1.default.findOne({ uniqueId, password });
        if (!employee)
            return res.status(400).json({ message: 'Invalid Id or password by Employee' });
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const payload = { employee: { id: employee.id } };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error while logging Employee', error: err.message });
    }
});
exports.login = login;
