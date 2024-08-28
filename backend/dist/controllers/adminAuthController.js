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
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const zod_1 = __importDefault(require("zod"));
const signupCredentialSyntax = zod_1.default.object({
    adminname: zod_1.default.string().min(3).max(30),
    password: zod_1.default.string().min(5).max(30)
});
const loginCredentialSyntax = zod_1.default.object({
    adminname: zod_1.default.string().min(3).max(30),
    password: zod_1.default.string()
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedInput = signupCredentialSyntax.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(411).json({ msg: parsedInput.error });
        }
        const input = req.body;
        const adminname = input.adminname;
        const password = input.password;
        const isUserAlreadyPresent = yield Admin_1.default.findOne({ adminname });
        if (isUserAlreadyPresent) {
            return res.status(500).json({ message: "Admin with this name already present" });
        }
        const profilePic = `https://avatar.iran.liara.run/public/boy`;
        const user = yield new Admin_1.default({
            adminname: adminname,
            password,
            profilePic: profilePic
        });
        yield user.save().then(() => {
            console.log(`New user created successfully: ${user.adminname} `);
        }).catch((e) => {
            return res.status(500).json({ message: `${e}` });
        });
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const payload = { user: { id: user.id } };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            res.status(201).json({ token });
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedInput = loginCredentialSyntax.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(411).json({ msg: parsedInput.error });
        }
        const input = req.body;
        const adminname = input.adminname;
        const password = input.password;
        const user = yield Admin_1.default.findOne({ adminname });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials of Admin while loging up' });
        const isMatch = yield user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials by Admin' });
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const payload = { user: { id: user.id } };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error while logging Admin', error: err.message });
    }
});
exports.login = login;
