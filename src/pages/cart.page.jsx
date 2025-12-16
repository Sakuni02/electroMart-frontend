import CartItem from "@/components/Cart.Item";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoveLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function Cart() {
  const cart = useSelector((state) => state.cart.cartItems);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container px-4 md:px-8 lg:px-20 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-start sm:items-center mt-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Shopping Cart
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
        <div className="col-span-2 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => <CartItem key={index} item={item} />)
          ) : (
            <p className="text-center text-muted-foreground py-10">
              Your cart is empty.
            </p>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border lg:sticky lg:top-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mt-2 text-sm sm:text-base">
              <span>Subtotal</span>
              <span>$ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mt-2 text-sm sm:text-base">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between mt-2 text-base sm:text-lg font-semibold">
              <span>Total</span>
              <span>$ {subtotal.toLocaleString()}</span>
            </div>

            {cart.length > 0 ? (
              <Link to="/shop/checkout">
                <Button size="lg" className="w-full mt-4 sm:mt-5 bg-blue-500">
                  Proceed to Checkout
                </Button>
              </Link>
            ) : (
              <p>No items in cart</p>
            )}

            <Link to="/">
              <Button
                size="lg"
                className="mt-3 sm:mt-4 w-full transition-colors duration-300 hover:bg-emerald-500"
                variant="outline"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
