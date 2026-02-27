import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// This component protects routes that require authentication
// Used for dashboard pages
export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
