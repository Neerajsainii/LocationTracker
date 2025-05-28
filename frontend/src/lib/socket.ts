import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '@/types';

class SocketClient {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(): Socket {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';
    
    this.socket = io(socketUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Emit events
  emitLocationUpdate(data: SocketEvents['location-update']): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('location-update', data);
    }
  }

  emitOrderStatusChange(data: SocketEvents['order-status-change']): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('order-status-change', data);
    }
  }

  // Listen to events
  onLocationUpdate(callback: (data: SocketEvents['location-update']) => void): void {
    if (this.socket) {
      this.socket.on('location-update', callback);
    }
  }

  onOrderStatusChange(callback: (data: SocketEvents['order-status-change']) => void): void {
    if (this.socket) {
      this.socket.on('order-status-change', callback);
    }
  }

  onNewOrder(callback: (data: SocketEvents['new-order']) => void): void {
    if (this.socket) {
      this.socket.on('new-order', callback);
    }
  }

  onOrderAssigned(callback: (data: SocketEvents['order-assigned']) => void): void {
    if (this.socket) {
      this.socket.on('order-assigned', callback);
    }
  }

  // Remove event listeners
  offLocationUpdate(): void {
    if (this.socket) {
      this.socket.off('location-update');
    }
  }

  offOrderStatusChange(): void {
    if (this.socket) {
      this.socket.off('order-status-change');
    }
  }

  offNewOrder(): void {
    if (this.socket) {
      this.socket.off('new-order');
    }
  }

  offOrderAssigned(): void {
    if (this.socket) {
      this.socket.off('order-assigned');
    }
  }

  // Join/leave rooms
  joinRoom(room: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-room', room);
    }
  }

  leaveRoom(room: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave-room', room);
    }
  }

  // Get connection status
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Get socket instance
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Create and export a singleton instance
export const socketClient = new SocketClient();
export default socketClient; 