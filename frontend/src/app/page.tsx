'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
              Location Tracker
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-2">
              Multivendor Delivery Platform
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Real-time location tracking for customers, vendors, and delivery partners. 
              Track your orders, manage deliveries, and optimize routes with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Customers</h3>
              <p className="text-gray-600">
                Track your orders in real-time, see delivery partner location, and get accurate ETAs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Vendors</h3>
              <p className="text-gray-600">
                Manage orders, assign delivery partners, and monitor your business performance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Delivery Partners</h3>
              <p className="text-gray-600">
                Accept orders, navigate efficiently, and track your earnings in real-time.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button 
              onClick={() => router.push('/login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => router.push('/register')}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
