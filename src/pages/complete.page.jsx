import { Button } from "@/components/ui/button";
import { CircleCheckBig, Package, Truck } from "lucide-react";
import { motion } from "framer-motion";
import CheckoutItem from "@/components/CheckoutItem";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router";
import { useGetCheckoutSessionStatusQuery } from "@/lib/api";
import { useEffect, useRef } from "react";
import { clearCartLocal } from "../lib/features/cartSlice";

function OrderSuccess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } =
    useGetCheckoutSessionStatusQuery(sessionId);

  const dispatch = useDispatch();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (data?.status === "complete" && !clearedRef.current) {
      dispatch(clearCartLocal());
      clearedRef.current = true;
    }
  }, [data?.status, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data?.status === "open") {
    return <Navigate to="/checkout" />;
  }

  const purchasedProducts = data.purchasedProducts || [];
  const totals = data.totals || { subtotal: 0, shipping: 0, total: 0 };

  if (data?.status === "complete") {
    return (
      <section id="success">
        <div className="flex justify-center items-center min-h-screen mt-20">
          <div className="flex-col gap-4 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
              className="flex justify-center items-center border rounded-full w-20 h-20 bg-green-600/20"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 1,
                  duration: 0.8,
                }}
              >
                <CircleCheckBig className="w-12 h-12 text-green-300" />
              </motion.div>
            </motion.div>

            <h1 className="text-4xl font-bold">Order Confirmed!</h1>
            <h1 className="text-xl text-muted-foreground">
              Thank you for your purchase
            </h1>
            <h1 className="text-lg text-muted-foreground">
              Order {data.orderId}
            </h1>

            <div className="flex border rounded-2xl w-full justify-center items-center gap-30 px-20 py-8">
              <div className="flex-col flex justify-center items-center gap-1">
                <div className="flex justify-center items-center border rounded-full w-14 h-14 bg-green-600/20">
                  <CircleCheckBig className="w-7 h-7 text-green-300" />
                </div>

                <h1 className="text-sm font-bold">Order Placed</h1>
                <h1 className="text-xs text-muted-foreground">
                  November 28, 2025
                </h1>
              </div>

              <div className="flex-col flex justify-center items-center gap-1">
                <div className="flex justify-center items-center border rounded-full w-14 h-14 bg-blue-600/20">
                  <Package className="w-7 h-7 text-blue-300" />
                </div>

                <h1 className="text-sm font-bold">Processing</h1>
                <h1 className="text-xs text-muted-foreground">
                  1-2 business days
                </h1>
              </div>

              <div className="flex-col flex justify-center items-center gap-1">
                <div className="flex justify-center items-center border rounded-full w-14 h-14 bg-gray-600/20">
                  <Truck className="w-7 h-7 text-gray-300" />
                </div>

                <h1 className="text-sm font-bold">Delivery</h1>
                <h1 className="text-xs text-muted-foreground">
                  December 3, 2025
                </h1>
              </div>
            </div>

            <div className="border rounded-2xl w-full px-6 py-8">
              <h1 className="text-2xl font-bold">Order Details</h1>

              <div className="flex-col flex justify-start mt-4">
                {/* <div className="flex gap-4">
                  <img
                    src="assets/images/audio1.jpg"
                    alt=""
                    className="w-25 h-25 rounded-2xl"
                  />

                  <div className="flex-col flex gap-1">
                    <h1 className="text-lg font-bold">{data.name}</h1>
                    <h1 className="text-sm text-muted-foreground">
                      Color: Space Black
                    </h1>
                    <h1 className="text-sm text-muted-foreground">
                      Quantity: 1
                    </h1>
                    <h1 className="text-lg font-bold">$1199.00</h1>
                  </div>
                </div> */}

                {purchasedProducts.length > 0 ? (
                  purchasedProducts.map((item, index) => (
                    <div className="flex gap-4" key={index}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-25 h-25 rounded-2xl"
                      />

                      <div className="flex-col flex gap-1">
                        <h1 className="text-lg font-bold">{item.name}</h1>
                        <h1 className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </h1>
                        <h1 className="text-lg font-bold">${item.price}</h1>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </div>

              <div className="border mt-5 mb-5" />

              <div className="border mt-5 mb-5" />
              <div className="flex justify-between items-center mt-2">
                <h1 className="text-lg">Subtotal</h1>
                <h1 className="text-lg">${totals.subtotal}</h1>
              </div>
              <div className="flex justify-between items-center mt-2">
                <h1 className="text-lg">Shipping</h1>
                <h1 className="text-lg">${totals.shipping}</h1>
              </div>
              <div className="flex justify-between items-center mt-2">
                <h1 className="text-xl font-bold">Total</h1>
                <h1 className="text-xl font-bold">${totals.total}</h1>
              </div>
            </div>

            <div className="border rounded-2xl w-full px-6 py-8">
              <h1 className="text-xl font-semibold">Shipping Address</h1>
              <div className="flex-col flex justify-start mt-4 gap-1">
                <h1 className="text-lg font-semibold">John Doe</h1>
                <h1 className="text-sm text-muted-foreground">
                  123 Main Street
                </h1>
                <h1 className="text-sm text-muted-foreground">Apt 4B</h1>
                <h1 className="text-sm text-muted-foreground">
                  New York, NY 10001
                </h1>
              </div>
            </div>

            <Button className={"w-full mt-2"}>Continue Shopping</Button>

            <div className="border rounded-2xl w-full py-4 text-center mb-8">
              <h1 className="text-sm text-muted-foreground">
                A confirmation email has been sent to your email address
              </h1>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default OrderSuccess;
