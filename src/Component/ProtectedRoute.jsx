import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  let role = localStorage.getItem("userRole"); // get role from storage
  
  // If userRole is not found, try to extract from user object
  if (!role) {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        role = user.role || user.ROLE;
        
        // Save the role for future use
        if (role) {
          localStorage.setItem("userRole", role);
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  if (!role) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but role not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
