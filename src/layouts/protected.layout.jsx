import { Outlet, Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const ProtectedLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
