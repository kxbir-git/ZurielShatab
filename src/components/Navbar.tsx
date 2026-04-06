import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="font-heading text-2xl font-semibold tracking-wider uppercase">
          AURÈLE
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <Link to="/shop?category=women" className="hover:text-muted-foreground transition-colors">Women</Link>
          <Link to="/shop?category=men" className="hover:text-muted-foreground transition-colors">Men</Link>
          <Link to="/shop?category=accessories" className="hover:text-muted-foreground transition-colors">Accessories</Link>
          <Link to="/shop" className="hover:text-muted-foreground transition-colors">Shop All</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/shop" aria-label="Search">
            <Search className="h-5 w-5 hover:text-muted-foreground transition-colors" />
          </Link>
          <Link to="/shop" aria-label="Wishlist">
            <Heart className="h-5 w-5 hover:text-muted-foreground transition-colors" />
          </Link>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5 hover:text-muted-foreground transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border animate-fade-in">
          <div className="flex flex-col px-4 py-4 gap-4 text-sm font-medium tracking-wide uppercase">
            <Link to="/shop?category=women" onClick={() => setMobileOpen(false)}>Women</Link>
            <Link to="/shop?category=men" onClick={() => setMobileOpen(false)}>Men</Link>
            <Link to="/shop?category=accessories" onClick={() => setMobileOpen(false)}>Accessories</Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop All</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
