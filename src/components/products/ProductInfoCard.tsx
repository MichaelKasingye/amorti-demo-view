
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Product } from "@/types/products";

interface ProductInfoCardProps {
  product: Product;
}

export const ProductInfoCard = ({ product }: ProductInfoCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Product Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-semibold capitalize">{product.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Description:</span>
          <span className="text-right max-w-xs">{product.description || "No description"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Value Percentage:</span>
          <span className="font-semibold">{product.valuePercentage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created:</span>
          <span>{formatDate(product.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
