import { Menu, X, ShoppingCart, Search, User, Sun, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

function Navigation() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMenuOpen(false);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-white/30 backdrop-blur-lg dark:bg-neutral-800/30">
      <div className="container flex h-16 items-center justify-between px-10 md:px-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            ElectroMart
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            {
              path: "/shop/smartphones",
              label: "Smartphones",
            },

            {
              path: "/shop/accssessories",
              label: "Accessories",
            },

            {
              path: "/shop/audio",
              label: "Audio",
            },

            {
              path: "/shop/cases",
              label: "Cases",
            },

            {
              path: "/shop/charges",
              label: "Charges",
            },
          ].map((item) => {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full search-glow rounded-lg">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/shop/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                {cartItemCount}
              </Badge>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center px-3 py-2 rounded-md border"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Link to={"/sign-up"}>
                <DropdownMenuItem className="px-3 py-2">
                  Sign Up
                </DropdownMenuItem>
              </Link>
              <Link to={"/sign-in"}>
                <DropdownMenuItem className="px-3 py-2">
                  Sign In
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden w-full bg-white dark:bg-neutral-800 z-10 shadow-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-8 pb-2 pt-5">
          <div className="relative w-full search-glow rounded-lg">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="pb-4 pt-4">
          {[
            {
              path: "/shop/smartphones",
              label: "Smartphones",
            },

            {
              path: "/shop/accssessories",
              label: "Accessories",
            },

            {
              path: "/shop/audio",
              label: "Audio",
            },

            {
              path: "/shop/cases",
              label: "Cases",
            },

            {
              path: "/shop/charges",
              label: "Charges",
            },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-sm font-medium text-muted-foreground hover:text-primary px-8 pb-2 pt-5"
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 px-4 py-3 border-t border-gray-200 dark:border-neutral-700">
          <Link
            to="/cart"
            className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700"
            onClick={closeMobileMenu}
          >
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                8
              </Badge>
            </Button>
          </Link>
          <a
            to="/user"
            className="flex items-center gap-2 px-2 py-2 rounded-md"
            onClick={closeMobileMenu}
          >
            <User className="h-5 w-5" />
            Account
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navigation;
