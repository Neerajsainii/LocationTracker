import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server);

// Update MongoDB connection to use environment variable
import connectDB from './database';
connectDB();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Add more event listeners here for real-time updates
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 