import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import adminAuthRoutes from './routes/adminAuthRoutes';
import adminRoutes from './routes/adminRoutes';
import employeeAuthRoutes from './routes/employeeAuthRoutes'
import employeeRoutes from './routes/employeeRoutes'
import DailyLocation from './models/Location';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

// app.use('/locations', locationRoutes);

app.use('/admin/auth', adminAuthRoutes);
app.use('/admin', adminRoutes);


app.use('/employee/auth', employeeAuthRoutes);
app.use('/employee', employeeRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, {
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Database connection error:', err);
});

const wss = new WebSocketServer({ port: 8080 });

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

      // Ensure the date string is formatted as YYYY-MM-DD
      const date = new Date().toISOString().split('T')[0];

      await DailyLocation.findOneAndUpdate(
        { employeeId },
        { $push: { locations: locationData } },
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