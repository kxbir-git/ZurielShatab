import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-wider uppercase mb-4">ZURIEL SHATAB</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Timeless pieces crafted with intention. Where minimalism meets luxury.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium tracking-wide uppercase mb-4">Shop</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/shop?category=women" className="hover:opacity-100 transition-opacity">Women</Link>
            <Link to="/shop?category=men" className="hover:opacity-100 transition-opacity">Men</Link>
            <Link to="/shop?category=accessories" className="hover:opacity-100 transition-opacity">Accessories</Link>
            <Link to="/shop" className="hover:opacity-100 transition-opacity">New Arrivals</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium tracking-wide uppercase mb-4">Company</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
            <span>Careers</span>
            <span>Sustainability</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium tracking-wide uppercase mb-4">Newsletter</h4>
          <p className="text-sm opacity-70 mb-3">Get early access to new collections and exclusive offers.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50"
            />
            <button className="bg-primary-foreground text-primary px-4 py-2 text-sm font-medium tracking-wide uppercase hover:opacity-90 transition-opacity">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
        <span>© 2026 ZURIEL SHATAB. All rights reserved.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Shipping</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
