import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date and time
export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

// Format distance
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

// Estimate delivery time based on distance
export function estimateDeliveryTime(distance: number): number {
  // Assuming average speed of 30 km/h in city
  const averageSpeed = 30;
  const timeInHours = distance / averageSpeed;
  const timeInMinutes = Math.ceil(timeInHours * 60);
  return Math.max(timeInMinutes, 15); // Minimum 15 minutes
}

// Format time duration
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}min`;
}

// Get user role display name
export function getRoleDisplayName(role: string): string {
  switch (role) {
    case 'customer':
      return 'Customer';
    case 'vendor':
      return 'Vendor';
    case 'delivery-partner':
      return 'Delivery Partner';
    default:
      return role;
  }
}

// Get order status color
export function getOrderStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'accepted':
      return 'text-blue-600 bg-blue-100';
    case 'preparing':
      return 'text-orange-600 bg-orange-100';
    case 'ready':
      return 'text-purple-600 bg-purple-100';
    case 'picked-up':
      return 'text-indigo-600 bg-indigo-100';
    case 'in-transit':
      return 'text-cyan-600 bg-cyan-100';
    case 'delivered':
      return 'text-green-600 bg-green-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// Validate coordinates
export function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
} 