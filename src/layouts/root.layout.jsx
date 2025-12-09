import { loadUserCart } from "@/lib/features/cartSlice";
import Navigation from "../components/Navigation";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";

function RootLayout() {
  const dispatch = useDispatch();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      dispatch(loadUserCart());
    }
  }, [isSignedIn, dispatch]);

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
