import React from 'react';
import { Product } from '../../../contexts/ProductContext';
import { ShoppingBag, Plus } from 'lucide-react';

interface ProductItemProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const isLowStock = product.stockQuantity <= product.lowStockThreshold;
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-in">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          {isOutOfStock ? (
            <span className="badge bg-error-100 text-error-800">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="badge bg-warning-100 text-warning-800">
              Low Stock: {product.stockQuantity}
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">₱{product.price.toFixed(2)}</p>
          <button
            className="p-2 bg-primary-500 rounded-full text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onAddToCart}
            disabled={isOutOfStock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;