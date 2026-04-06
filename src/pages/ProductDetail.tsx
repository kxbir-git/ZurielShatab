import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { Star, Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const WishlistButton = ({ productId }: { productId: string }) => {
  const { toggleItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(productId);
  return (
    <button
      onClick={() => { toggleItem(productId); toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
      className={`p-3 border transition-colors ${wishlisted ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
    </button>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-heading font-semibold mb-4">Product not found</h1>
        <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground underline">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error("Please select a size"); return; }
    if (!selectedColor) { toast.error("Please select a color"); return; }
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-[3/4] bg-secondary overflow-hidden">
          <img src={product.image} alt={product.name} width={800} height={1067} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center py-4">
          {product.badge && (
            <span className="text-xs tracking-wider uppercase text-muted-foreground mb-2">{product.badge}</span>
          )}
          <h1 className="heading-display text-3xl md:text-4xl font-semibold mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-border"}`} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.reviews} reviews</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-medium">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Size */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    selectedSize === size ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    selectedColor === color ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center border border-border w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-secondary transition-colors" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-secondary transition-colors" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleAddToCart} className="flex-1 bg-primary text-primary-foreground py-3 text-sm font-medium tracking-wider uppercase hover:opacity-90 transition-opacity">
              Add to Cart
            </button>
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="heading-display text-2xl font-semibold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
