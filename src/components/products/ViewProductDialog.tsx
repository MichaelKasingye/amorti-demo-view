
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/products";

interface ViewProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ViewProductDialog({ open, onClose, product }: ViewProductDialogProps) {
  if (!product) return null;

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Product details and information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Name</h4>
            <p className="text-sm">{product.name}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Description</h4>
            <p className="text-sm">{product.description || "No description provided"}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Value Percentage</h4>
            <p className="text-sm">{product.valuePercentage}%</p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Created</h4>
            <p className="text-sm">{formatDate(product.createdAt)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
