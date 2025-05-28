'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'delivery-partner':
        return 'Delivery Partner';
      case 'vendor':
        return 'Vendor';
      case 'customer':
        return 'Customer';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'delivery-partner':
        return 'bg-purple-100 text-purple-800';
      case 'vendor':
        return 'bg-green-100 text-green-800';
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Location Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.username}!</span>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Dashboard
              </h2>
              
              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </span>
              </div>

              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <p className="mt-1 text-sm text-gray-900">{user.username}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-sm text-gray-900">{getRoleDisplayName(user.role)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-gray-600">
                <p className="mb-4">
                  Welcome to your {getRoleDisplayName(user.role)} dashboard! 
                </p>
                <p className="text-sm">
                  This is where you&apos;ll manage your activities on the Location Tracker platform.
                  More features will be available soon!
                </p>
              </div>

              {/* Role-specific content placeholder */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {user.role === 'customer' && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Track Orders</h4>
                      <p className="text-sm text-gray-600">View and track your current orders</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Order History</h4>
                      <p className="text-sm text-gray-600">View your past orders and receipts</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Favorites</h4>
                      <p className="text-sm text-gray-600">Manage your favorite vendors</p>
                    </div>
                  </>
                )}

                {user.role === 'vendor' && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Manage Orders</h4>
                      <p className="text-sm text-gray-600">View and process incoming orders</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Inventory</h4>
                      <p className="text-sm text-gray-600">Manage your product inventory</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Analytics</h4>
                      <p className="text-sm text-gray-600">View sales and performance metrics</p>
                    </div>
                  </>
                )}

                {user.role === 'delivery-partner' && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Available Orders</h4>
                      <p className="text-sm text-gray-600">View orders available for pickup</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Active Deliveries</h4>
                      <p className="text-sm text-gray-600">Track your current deliveries</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="font-medium text-gray-900 mb-2">Earnings</h4>
                      <p className="text-sm text-gray-600">View your earnings and statistics</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 