'use client';
import React, { useEffect, useState, useCallback } from 'react';
import AppLayout from '@/components/atomic/AppLayout';
import NotificationItem from '@/components/notifications/NotificationItem';
import { useSession } from '@/contexts/SessionContext';
import { Notification } from '@/utils/types';

const NotificationList: React.FC = () => {
  const { session, sessionLoading } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!session) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/notifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session && !sessionLoading) {
      fetchNotifications();
    }
  }, [session, sessionLoading, fetchNotifications]);

  if (!session) return null; // handle this better

  return (
    <AppLayout>
      <div className='flex flex-col flex-1 bg-white'>
        <div className='sticky top-0 z-10 bg-white border-b border-gray-200'>
          <h1 className='text-xl font-bold pb-3'>Notifications</h1>
        </div>
        <div className='flex-1'>
          {sessionLoading || isLoading && <div>Loading...</div>}
          {error && <div className="text-red-500 p-4">{error}</div>}
          {!isLoading && !error && notifications.length === 0 && (
            <div className="p-4">No notifications yet.</div>
          )}
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              sessionUsername={session.username}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationList;