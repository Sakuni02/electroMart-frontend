import { useDispatch, useSelector } from "react-redux";
import CartItem from "@/components/Cart.Item";
import PaymentForm from "@/components/PaymentForm";
import { Navigate, useSearchParams } from "react-router";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">Review Your Order</h2>
      <div className="mt-4 grid grid-cols-4 gap-x-4">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>

      <div className="mt-4">
        <p>
          Total price:$
          {cart.reduce(
            (acc, item) => acc + item.product.price * item.quality,
            0
          )}
        </p>
      </div>

      <div className="mt-4">
        <PaymentForm orderId={orderId} />
      </div>
    </main>
  );
}

export default PaymentPage;
