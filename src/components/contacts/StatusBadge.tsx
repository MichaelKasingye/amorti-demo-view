
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "active" | "inactive" | "lead";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${
        status === "active"
          ? "border-green-500 text-green-600 dark:border-green-700 dark:text-green-400"
          : status === "lead"
          ? "border-blue-500 text-blue-600 dark:border-blue-700 dark:text-blue-400"
          : "border-gray-500 text-gray-600 dark:border-gray-700 dark:text-gray-400"
      }`}
    >
      {status === "active" ? "Active" : status === "lead" ? "Lead" : "Inactive"}
    </Badge>
  );
}
