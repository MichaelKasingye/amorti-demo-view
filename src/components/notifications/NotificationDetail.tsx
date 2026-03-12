
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Trash2 } from "lucide-react";
import { Notification } from "@/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

interface NotificationDetailProps {
  notification: Notification;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const NotificationDetail = ({ 
  notification, 
  onBack, 
  onDelete 
}: NotificationDetailProps) => {
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

  const handleRelatedClick = () => {
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

  const handleDelete = () => {
    onDelete(notification.id);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Notification Details</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl">{notification.title}</CardTitle>
              <div className="flex items-center gap-2">
                {getTypeBadge(notification.type)}
                <span className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {notification.relatedId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRelatedClick}
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Related
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="gap-2 text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {notification.body}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
