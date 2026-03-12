
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/products";
import { sampleDeals } from "@/types/deals";
import { ProductInfoCard } from "@/components/products/ProductInfoCard";
import { DealsSummaryCard } from "@/components/products/DealsSummaryCard";
import { AssociatedDealsTable } from "@/components/products/AssociatedDealsTable";

// Sample products data - in a real app this would come from your backend
const sampleProducts: Product[] = [
  {
    id: "p1",
    name: "mortgage",
    description: "Home mortgage lending product",
    valuePercentage: 20,
    createdAt: "2023-05-15T10:30:00Z"
  },
  {
    id: "p2", 
    name: "auto loan",
    description: "Vehicle financing solution",
    valuePercentage: 15,
    createdAt: "2023-05-20T14:15:00Z"
  },
  {
    id: "p3",
    name: "personal loan",
    description: "Unsecured personal lending",
    valuePercentage: 25,
    createdAt: "2023-05-25T09:00:00Z"
  }
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, this would fetch from an API
  const product = sampleProducts.find(p => p.id === id);
  
  // Filter deals that are associated with this product (for demo purposes, we'll show all deals)
  // In a real app, you'd filter by product association
  const productDeals = sampleDeals.filter(deal => 
    deal.description.toLowerCase().includes(product?.name.toLowerCase() || '')
  );
  
  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/products')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Product Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>The product you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/products')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold capitalize">{product.name}</h1>
          <p className="text-muted-foreground">{product.description || "No description provided"}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProductInfoCard product={product} />
        <DealsSummaryCard deals={productDeals} />
      </div>

      <AssociatedDealsTable deals={productDeals} />
    </div>
  );
};

export default ProductDetails;
