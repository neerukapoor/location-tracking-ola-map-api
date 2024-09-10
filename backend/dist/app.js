"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importStar(require("ws"));
const adminAuthRoutes_1 = __importDefault(require("./routes/adminAuthRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const employeeAuthRoutes_1 = __importDefault(require("./routes/employeeAuthRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const Location_1 = __importDefault(require("./models/Location"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: '.env.production' });
}
else if (process.env.NODE_ENV === 'staging') {
    dotenv_1.default.config({ path: '.env.staging' });
}
else {
    dotenv_1.default.config(); // Load default .env file for development
}
const server = http_1.default.createServer(app);
console.log('Current NODE_ENV adf:', process.env.NODE_ENV);
app.use('/admin/auth', adminAuthRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
app.use('/employee/auth', employeeAuthRoutes_1.default);
app.use('/employee', employeeRoutes_1.default);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';
mongoose_1.default.connect(MONGO_URI, {}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Database connection error:', err);
});
let wss;
if (process.env.NODE_ENV === 'production') {
    wss = new ws_1.WebSocketServer({ server });
}
else {
    wss = new ws_1.WebSocketServer({ port: 8080 });
}
wss.on('connection', (ws) => {
    ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parsedMessage = JSON.parse(message.toString());
            const { employeeId, latitude, longitude } = parsedMessage;
            // Store location data in MongoDB
            const locationData = { timestamp: new Date(), latitude, longitude };
            // Ensure the date string is formatted as YYYY-MM-DD
            const date = new Date().toISOString().split('T')[0];
            yield Location_1.default.findOneAndUpdate({ employeeId, date }, { $push: { locations: locationData } }, { new: true, upsert: true });
            // Broadcast the location update to all connected clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === ws_1.default.OPEN) {
                    client.send(JSON.stringify({ employeeId, latitude, longitude }));
                }
            });
        }
        catch (error) {
            console.error('Error handling WebSocket message:', error);
        }
    }));
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
