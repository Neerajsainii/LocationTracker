// User Types
export interface User {
  _id: string;
  username: string;
  role: 'customer' | 'vendor' | 'delivery-partner';
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  role: 'customer' | 'vendor' | 'delivery-partner';
  email?: string;
  phone?: string;
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  timestamp?: string;
}

export interface LocationUpdate {
  userId: string;
  location: Location;
  orderId?: string;
}

// Order Types
export interface Order {
  _id: string;
  vendorId: string;
  deliveryPartnerId?: string;
  customerId: string;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  pickupLocation: Location;
  deliveryLocation: Location;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Socket Events
export interface SocketEvents {
  'location-update': LocationUpdate;
  'order-status-change': {
    orderId: string;
    status: Order['status'];
    timestamp: string;
  };
  'new-order': Order;
  'order-assigned': {
    orderId: string;
    deliveryPartnerId: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Map Types
export interface MapProps {
  center: Location;
  zoom?: number;
  markers?: MapMarker[];
  onLocationSelect?: (location: Location) => void;
}

export interface MapMarker {
  id: string;
  position: Location;
  type: 'customer' | 'vendor' | 'delivery-partner';
  title?: string;
  description?: string;
} 