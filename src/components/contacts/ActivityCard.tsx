
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function ActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No recent activity recorded for this contact.</p>
      </CardContent>
    </Card>
  );
}
