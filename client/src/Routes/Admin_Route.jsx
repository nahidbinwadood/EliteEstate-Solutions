import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Loading/LoadingSpinner";
const Admin_Route = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "admin") return children;
  return <Navigate to="/" />;
};

export default Admin_Route;

Admin_Route.propTypes = {
  children: PropTypes.element,
};
