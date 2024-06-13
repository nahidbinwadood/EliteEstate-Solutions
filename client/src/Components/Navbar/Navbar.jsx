import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { AiFillCloseSquare } from "react-icons/ai";
import { useState } from "react";
import logo from "../../assets/logo/Logo.svg";
import useAuth from "./../../Hooks/useAuth";
import "./Navbar.css";
import useRole from "../../Hooks/useRole";
const Navbar = () => {
  const [role] = useRole();
  const { user, logOut } = useAuth();
  const [clicked, setClicked] = useState(false);
  const handleToggle = () => {
    setClicked(!clicked);
  };
  return (
    <nav className="md:px-12 px-6 md:bg-slate-800 bg-slate-900   w-full z-10 text-white">
      <div className="h-[10vh] py-8 flex items-center justify-between">
        <div className="cursor-pointer flex items-center">
          <img className="size-24" src={logo} alt="" />
          <div className="text-2xl font-lora font-semibold">
            <h2 className="text-[#F5F5DC]">Elite Estate</h2>
            <h2> Solutions</h2>
          </div>
        </div>
        <div className="font-roboto text-lg font-semibold">
          <div className="flex items-center gap-4">
            <ul className="hidden lg:flex items-center gap-6">
              <li className="">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#E0F000] text-xl font-bold" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-properties"
                  className={({ isActive }) =>
                    isActive ? "text-[#E0F000] text-xl font-bold" : ""
                  }
                >
                  All Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={
                    role === "user"
                      ? "/dashboard/user-profile"
                      : role == "agent"
                      ? "/dashboard/agent-profile"
                      : role == "admin"
                      ? "/dashboard/admin-profile"
                      : "/dashboard/user-profile"
                  }
                  className={({ isActive }) =>
                    isActive ? "text-[#E0F000] text-xl font-bold" : ""
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>

            <div
              onClick={handleToggle}
              className="p-2  lg:hidden cursor-pointer rounded-full"
            >
              {clicked ? <HiOutlineMenu /> : <AiFillCloseSquare />}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex">
          {user?.email ? (
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex">
                <h2 className="font-roboto font-medium text-lg">
                  {user?.displayName}
                </h2>
              </div>
              <div className="w-10">
                <img
                  title={user.displayName}
                  className="rounded-full cursor-pointer transition hover:scale-95"
                  src={user.photoURL ? user?.photoURL : ""}
                  alt={"displayName"}
                />
              </div>
              <button
                className="font-roboto transition duration-150 font-bold text-lg btn-reg px-8 py-2"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="font-roboto transition duration-150 font-bold text-lg btn-grad px-8 py-2">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {!clicked ? (
        <div className="md:hidden flex flex-col font-roboto font-semibold gap-2 py-4 items-center font-inter">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/all-properties"> All Properties</NavLink>
          <NavLink
            to={
              role === "user"
                ? "/dashboard/user-profile"
                : role == "agent"
                ? "/dashboard/agent-profile"
                : role == "admin"
                ? "/dashboard/admin-profile"
                : "/dashboard/user-profile"
            }
          >
            Dashboard
          </NavLink>
          {user ? (
            <NavLink to="/">
              <button onClick={logOut}>Logout</button>
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
