
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  relatedId?: string;
  relatedType?: 'contact' | 'deal' | 'product' | 'user';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Contact Added',
    body: 'Alex Johnson has been added to your contacts. They are interested in your premium services.',
    type: 'success',
    isRead: false,
    createdAt: new Date('2024-06-14T10:30:00'),
    relatedId: 'c1',
    relatedType: 'contact'
  },
  {
    id: '2',
    title: 'Deal Stage Updated',
    body: 'The deal with HFB has moved to the negotiation stage. Follow up required.',
    type: 'info',
    isRead: false,
    createdAt: new Date('2024-06-14T09:15:00'),
    relatedId: 'd1',
    relatedType: 'deal'
  },
  {
    id: '3',
    title: 'Task Overdue',
    body: 'Your task "Follow up with Sarah Williams" is now overdue. Please complete it as soon as possible.',
    type: 'warning',
    isRead: true,
    createdAt: new Date('2024-06-13T16:45:00'),
    relatedId: 'c2',
    relatedType: 'contact'
  },
  {
    id: '4',
    title: 'Monthly Report Ready',
    body: 'Your monthly sales report is ready for review. Click to view detailed analytics.',
    type: 'info',
    isRead: true,
    createdAt: new Date('2024-06-13T08:00:00')
  },
  {
    id: '5',
    title: 'Payment Received',
    body: 'Payment of $5,000 has been received from XYZ Corp for the premium package.',
    type: 'success',
    isRead: false,
    createdAt: new Date('2024-06-12T14:20:00'),
    relatedId: 'd2',
    relatedType: 'deal'
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      isRead: false,
      createdAt: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
