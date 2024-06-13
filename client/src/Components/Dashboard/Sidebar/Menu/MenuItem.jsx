import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-white rounded-md   hover:text-slate-800 hover:font-bold ${
          isActive ? "bg-gray-300  text-gray-700" : "text-white"
        }`
      }
    >
      <Icon className="size-7" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};
MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
