
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { Notification } from "@/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (notification: Notification) => void;
}

export const NotificationCard = ({ 
  notification, 
  onMarkAsRead, 
  onDelete, 
  onClick 
}: NotificationCardProps) => {
  const navigate = useNavigate();

  const getTypeBadge = (type: Notification['type']) => {
    const variants = {
      info: 'bg-blue-100 text-blue-800 border-blue-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      error: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={variants[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleRelatedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.relatedId && notification.relatedType) {
      const routes = {
        contact: `/dashboard/contacts/${notification.relatedId}`,
        deal: `/dashboard/deals/${notification.relatedId}`,
        product: `/dashboard/products`,
        user: `/dashboard/users`
      };
      navigate(routes[notification.relatedType]);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  const handleCardClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    onClick(notification);
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        !notification.isRead ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'
      }`}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`font-medium truncate ${
                !notification.isRead ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {notification.title}
              </h3>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {notification.body}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTypeBadge(notification.type)}
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {notification.relatedId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRelatedClick}
                    className="h-8 px-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="h-8 px-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
