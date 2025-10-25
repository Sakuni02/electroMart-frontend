import CheckoutItem from "@/components/CheckoutItem";
import ShippingAddressForm from "@/components/ShippingAddressForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.cartItems);

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container lg:px-25">
      <div className="flex gap-2 justify-start items-center mt-12">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-4xl font-bold">Checkout</h1>
          <h1 className="text-lg text-muted-foreground mt-2">
            Complete your order
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  mt-8">
        <div className="col-span-2 mb-5">
          <div className="border-2 rounded-2xl">
            <ShippingAddressForm />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-6 border border-border sticky">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {cart.map((item, index) => (
              <CheckoutItem key={index} item={item} />
            ))}

            <div className="flex lg:flex-row-2 justify-between mt-2">
              <span>Subtotal</span>
              <span>Subtotal</span>
            </div>

            <div className="flex lg:flex-row-2 justify-between mt-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr className=" mb-5 mt-5" />

            <div className="flex lg:flex-row-2 justify-between mt-2 text-lg font-semibold">
              <span>Total</span>
              <span>LKR 650000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
