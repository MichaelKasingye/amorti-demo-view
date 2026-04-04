
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/products/ProductsTable";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { EditProductDialog } from "@/components/products/EditProductDialog";
import { ViewProductDialog } from "@/components/products/ViewProductDialog";
import { Product } from "@/types/products";

// Sample data - in a real app this would come from your backend
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
    name: "personal secured loan",
    description: "Secured personal lending",
    valuePercentage: 15,
    createdAt: "2023-05-20T14:15:00Z"
  },
  {
    id: "p3",
    name: "personal unsecured loan",
    description: "Unsecured personal lending",
    valuePercentage: 25,
    createdAt: "2023-05-25T09:00:00Z"
  }
];

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | null>(null);

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
    setDialogType(null);
  };

  const handleEditProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (!selectedProduct) return;
    
    setProducts(prev => prev.map(product => 
      product.id === selectedProduct.id 
        ? { ...product, ...productData }
        : product
    ));
    setDialogType(null);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  const openDialog = (type: 'add' | 'edit', product?: Product) => {
    setDialogType(type);
    setSelectedProduct(product || null);
  };

  const closeDialog = () => {
    setDialogType(null);
    setSelectedProduct(null);
  };

  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>
          <Button onClick={() => openDialog('add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Products Management</CardTitle>
            <CardDescription>
              Manage your products and their configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No Products Yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first product.
              </p>
              <Button onClick={() => openDialog('add')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Product
              </Button>
            </div>
          </CardContent>
        </Card>

        <AddProductDialog
          open={dialogType === 'add'}
          onClose={closeDialog}
          onSubmit={handleAddProduct}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>
        <Button onClick={() => openDialog('add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products Management</CardTitle>
          <CardDescription>
            Manage your products and their configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable
            products={products}
            onEdit={(product) => openDialog('edit', product)}
            onView={handleViewProduct}
            onDelete={handleDeleteProduct}
          />
        </CardContent>
      </Card>

      <AddProductDialog
        open={dialogType === 'add'}
        onClose={closeDialog}
        onSubmit={handleAddProduct}
      />

      <EditProductDialog
        open={dialogType === 'edit'}
        onClose={closeDialog}
        onSubmit={handleEditProduct}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
