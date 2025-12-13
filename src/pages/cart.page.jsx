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
    <div className="container lg:px-25 mb-8">
      <div className="flex gap-2 justify-start items-center mt-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <h1 className="text-lg text-muted-foreground mt-2">
            {cart.length} items in your cart
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 mb-5">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-6 border border-border sticky mt-5">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="flex lg:flex-row-2 justify-between mt-2">
              <span>Subtotal</span>
              <span>$ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex lg:flex-row-2 justify-between mt-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr className=" mb-5 mt-5" />

            <div className="flex lg:flex-row-2 justify-between mt-2 text-lg font-semibold">
              <span>Total</span>
              <span>$ {subtotal.toLocaleString()}</span>
            </div>

            {cart.length > 0 ? (
              <Link to="/shop/checkout">
                <Button size="lg" className="w-full mt-5 bg-blue-500">
                  Proceed to Checkout
                </Button>
              </Link>
            ) : (
              <p>No items in cart</p>
            )}

            <Button
              size="lg"
              className="mt-5 w-full transition-colors duration-300 hover:bg-emerald-500"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
