import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();
  const wishlistProducts = products.filter((p) => items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="heading-display text-3xl font-semibold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8">Save pieces you love to revisit them later.</p>
        <Link to="/shop" className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-wider uppercase hover:opacity-90 transition-opacity">
          Explore the Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="heading-display text-3xl font-semibold">Wishlist ({wishlistProducts.length})</h1>
        <button onClick={clearWishlist} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlistProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
