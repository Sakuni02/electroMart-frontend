import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { store } from "./lib/store";
import { Provider } from "react-redux";

import HomePage from "./pages/home.page";
import SignUpPage from "./pages/sign-up.page";
import SignInPage from "./pages/sign-in.page";
import CategoryView from "./pages/category-view.page";
import RootLayout from "./layouts/root.layout";
import Cart from "./pages/cart.page";
import CheckoutPage from "./pages/checkout.page";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedLayout from "./layouts/protected.layout";
import CreateProductPage from "./pages/create-product-page";
import AdminProtectedLayout from "./layouts/admin-protected.layout";
import SingleProductView from "./pages/sigle-product-view.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<SingleProductView />} />
              <Route path="/shop">
                <Route path=":slug" element={<CategoryView />} />
                <Route path="cart" element={<Cart />} />
                <Route element={<ProtectedLayout />}>
                  <Route path="checkout" element={<CheckoutPage />} />
                </Route>
              </Route>

              <Route element={<ProtectedLayout />}>
                <Route element={<AdminProtectedLayout />}>
                  <Route
                    path="/admin/products/create"
                    element={<CreateProductPage />}
                  />
                </Route>
              </Route>

              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
