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
exports.registerEmployee = exports.getLocations = exports.addLocation = void 0;
const Location_1 = __importDefault(require("../models/Location"));
const addLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, userId } = req.body;
    try {
        const newLocation = new Location_1.default({ latitude, longitude, userId });
        yield newLocation.save();
        res.status(201).json(newLocation);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});
exports.addLocation = addLocation;
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const locations = yield Location_1.default.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(locations);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});
exports.getLocations = getLocations;
const registerEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send("uouou");
});
exports.registerEmployee = registerEmployee;
