import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Loading/LoadingSpinner";
const Agent_Route = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "agent") return children;
  return <Navigate to="/" />;
};

export default Agent_Route;

Agent_Route.propTypes = {
  children: PropTypes.element,
};
