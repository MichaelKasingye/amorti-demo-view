
import { Product, ProductFormData } from "@/types/products";

export interface ProductsApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  total?: number;
}

// Simulate API delay
const simulateDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Dummy products data
const DUMMY_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Home Mortgage",
    description: "Traditional home mortgage loans with competitive rates",
    valuePercentage: 85,
    createdAt: "2024-06-01T09:00:00Z"
  },
  {
    id: "p2",
    name: "Commercial Loan",
    description: "Commercial property and business loans",
    valuePercentage: 75,
    createdAt: "2024-06-02T10:30:00Z"
  },
  {
    id: "p3",
    name: "Personal Loan",
    description: "Unsecured personal loans for various purposes",
    valuePercentage: 60,
    createdAt: "2024-06-03T14:15:00Z"
  },
  {
    id: "p4",
    name: "Auto Loan",
    description: "Vehicle financing with flexible terms",
    valuePercentage: 80,
    createdAt: "2024-06-04T11:45:00Z"
  }
];

class ProductsApiService {
  private products: Product[] = [...DUMMY_PRODUCTS];

  async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    minValue?: number;
    maxValue?: number;
  }): Promise<ProductsApiResponse<Product[]>> {
    await simulateDelay();
    
    let filteredProducts = [...this.products];
    
    // Apply filters
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params?.minValue !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.valuePercentage >= params.minValue!
      );
    }
    
    if (params?.maxValue !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.valuePercentage <= params.maxValue!
      );
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      data: paginatedProducts,
      message: "Products retrieved successfully",
      success: true,
      total: filteredProducts.length
    };
  }

  async getProductById(id: string): Promise<ProductsApiResponse<Product>> {
    await simulateDelay();
    
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    
    return {
      data: product,
      message: "Product retrieved successfully",
      success: true
    };
  }

  async createProduct(productData: ProductFormData): Promise<ProductsApiResponse<Product>> {
    await simulateDelay();
    
    // Simulate validation
    if (!productData.name || !productData.description) {
      throw new Error("Name and description are required");
    }
    
    if (productData.valuePercentage < 0 || productData.valuePercentage > 100) {
      throw new Error("Value percentage must be between 0 and 100");
    }
    
    // Check for duplicate name
    if (this.products.some(p => p.name.toLowerCase() === productData.name.toLowerCase())) {
      throw new Error("Product with this name already exists");
    }
    
    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: productData.name,
      description: productData.description,
      valuePercentage: productData.valuePercentage,
      createdAt: new Date().toISOString()
    };
    
    this.products.push(newProduct);
    
    return {
      data: newProduct,
      message: "Product created successfully",
      success: true
    };
  }

  async updateProduct(id: string, productData: Partial<ProductFormData>): Promise<ProductsApiResponse<Product>> {
    await simulateDelay();
    
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    
    // Validate value percentage if provided
    if (productData.valuePercentage !== undefined) {
      if (productData.valuePercentage < 0 || productData.valuePercentage > 100) {
        throw new Error("Value percentage must be between 0 and 100");
      }
    }
    
    // Check for duplicate name if name is being updated
    if (productData.name) {
      const existingProduct = this.products.find(p => 
        p.id !== id && p.name.toLowerCase() === productData.name!.toLowerCase()
      );
      if (existingProduct) {
        throw new Error("Product with this name already exists");
      }
    }
    
    const updatedProduct = {
      ...this.products[productIndex],
      ...productData
    };
    
    this.products[productIndex] = updatedProduct;
    
    return {
      data: updatedProduct,
      message: "Product updated successfully",
      success: true
    };
  }

  async deleteProduct(id: string): Promise<ProductsApiResponse<null>> {
    await simulateDelay();
    
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    
    this.products.splice(productIndex, 1);
    
    return {
      data: null,
      message: "Product deleted successfully",
      success: true
    };
  }

  async getProductStats(): Promise<ProductsApiResponse<{
    totalProducts: number;
    averageValue: number;
    topPerforming: Product[];
  }>> {
    await simulateDelay();
    
    const totalProducts = this.products.length;
    const averageValue = this.products.reduce((sum, p) => sum + p.valuePercentage, 0) / totalProducts;
    const topPerforming = [...this.products]
      .sort((a, b) => b.valuePercentage - a.valuePercentage)
      .slice(0, 3);
    
    return {
      data: {
        totalProducts,
        averageValue: Math.round(averageValue * 100) / 100,
        topPerforming
      },
      message: "Product statistics retrieved successfully",
      success: true
    };
  }
}

export const productsApi = new ProductsApiService();
