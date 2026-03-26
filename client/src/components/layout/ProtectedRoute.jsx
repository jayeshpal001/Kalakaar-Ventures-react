import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if the vault key exists in local storage
  const token = localStorage.getItem("kalakaar_token");

  // If no token is found, redirect them back to the login page immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the Command Center
  return children;
}