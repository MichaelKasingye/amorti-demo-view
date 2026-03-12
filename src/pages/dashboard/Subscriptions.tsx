
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Subscriptions = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Subscriptions</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>
            Manage your organization's subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              Subscription management is under development and will be available soon.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscriptions;
