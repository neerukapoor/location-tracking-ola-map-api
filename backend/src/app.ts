import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import adminAuthRoutes from './routes/adminAuthRoutes';
import adminRoutes from './routes/adminRoutes';
import Employee from './models/Employee';
import DailyLocation from './models/Location';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });


// app.use('/locations', locationRoutes);

app.use('/admin/auth', adminAuthRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, {
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Database connection error:', err);
});

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString()) as {
        employeeId: string;
        latitude: number;
        longitude: number;
      };

      const { employeeId, latitude, longitude } = parsedMessage;

      // Store location data in MongoDB
      const locationData = { timestamp: new Date(), latitude, longitude };

      await DailyLocation.findOneAndUpdate(
        { employeeId },
        { $set: { latitude, longitude, timestamp: new Date() } },
        { new: true, upsert: true }
      );

      // Broadcast the location update to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ employeeId, latitude, longitude }));
        }
      });
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});