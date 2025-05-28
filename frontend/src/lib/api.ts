import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, LoginCredentials, RegisterData, User, Order } from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string; user: User }>> {
    try {
      const response: AxiosResponse<{ token: string }> = await this.client.post('/api/login', credentials);
      return {
        success: true,
        data: {
          token: response.data.token,
          user: {} as User // You'll need to decode the token or make another call to get user data
        }
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Login failed'
      };
    }
  }

  async register(data: RegisterData): Promise<ApiResponse<{ token: string; user: User }>> {
    try {
      const response: AxiosResponse<{ token: string }> = await this.client.post('/api/register', data);
      return {
        success: true,
        data: {
          token: response.data.token,
          user: {} as User // You'll need to decode the token or make another call to get user data
        }
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Registration failed'
      };
    }
  }

  // Order endpoints
  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response: AxiosResponse<Order[]> = await this.client.get('/api/orders');
      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Failed to fetch orders'
      };
    }
  }

  async createOrder(orderData: Partial<Order>): Promise<ApiResponse<Order>> {
    try {
      const response: AxiosResponse<Order> = await this.client.post('/api/orders', orderData);
      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Failed to create order'
      };
    }
  }

  async updateOrder(orderId: string, updates: Partial<Order>): Promise<ApiResponse<Order>> {
    try {
      const response: AxiosResponse<Order> = await this.client.put(`/api/orders/${orderId}`, updates);
      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Failed to update order'
      };
    }
  }

  async getOrder(orderId: string): Promise<ApiResponse<Order>> {
    try {
      const response: AxiosResponse<Order> = await this.client.get(`/api/orders/${orderId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Failed to fetch order'
      };
    }
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<User> = await this.client.get('/api/user/me');
      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Failed to fetch user data'
      };
    }
  }

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<User> = await this.client.put('/api/user/profile', updates);
      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Failed to update profile'
      };
    }
  }

  // Location endpoints
  async updateLocation(location: { latitude: number; longitude: number; orderId?: string }): Promise<ApiResponse<void>> {
    try {
      await this.client.post('/api/location/update', location);
      return {
        success: true
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Failed to update location'
      };
    }
  }

  // Generic HTTP methods for direct access
  async get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url);
  }

  async post<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data);
  }

  async put<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data);
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url);
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();
export const api = apiClient; // For backward compatibility
export default apiClient; 