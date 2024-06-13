import { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import {
  BsCalendar2HeartFill,
  BsFillHouseAddFill,
  BsFillHouseGearFill,
  BsFillHousesFill,
  BsHouseCheckFill,
  BsHouseExclamationFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/Logo.svg";
import { ImMenu } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FaRegFaceGrinStars, FaUsersGear } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdvertisementFill, RiUserStarFill } from "react-icons/ri";
import useRole from "../../../Hooks/useRole";
import MenuItem from "./Menu/MenuItem";
const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
   

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-slate-800 text-gray-800 flex justify-between lg:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <div className="cursor-pointer pl-2 flex justify-center items-center">
                <img className="size-20" src={logo} alt="" />
                <div className="text-lg font-lora font-semibold">
                  <h2 className="text-[#fff]">Elite Estate</h2>
                  <h2 className="text-[#fff]"> Solutions</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button px-4 py-2 transition duration-200 ease-in-out focus:outline-none  "
        >
          {isActive ? (
            <ImMenu className="size-6 text-white" />
          ) : (
            <AiFillCloseSquare className="size-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-800 min-w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className=" hidden md:flex">
              <Link to="/">
                <div className="cursor-pointer pl-2 flex justify-center items-center">
                  <img className="size-20" src={logo} alt="" />
                  <div className="text-xl font-lora font-semibold">
                    <h2 className="text-[#fff]">Elite Estate</h2>
                    <h2 className="text-[#FFf]"> Solutions</h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="">
            {/*  Menu Items */}

            {/* <----User----> */}
            {role === "user" && (
              <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="font-lora ">
                  {/* My Profile */}
                  <MenuItem
                    label={"My Profile"}
                    address={"/dashboard/user-profile"}
                    icon={CgProfile}
                  ></MenuItem>
                  <MenuItem
                    label={"Wishlist"}
                    address={"/dashboard/wishlist"}
                    icon={BsCalendar2HeartFill}
                  ></MenuItem>
                  <MenuItem
                    label={"Property Bought"}
                    address={"/dashboard/property-bought"}
                    icon={BsHouseCheckFill}
                  ></MenuItem>
                  <MenuItem
                    label={"My Reviews"}
                    address={"/dashboard/my-reviews"}
                    icon={FaRegFaceGrinStars}
                  ></MenuItem>
                </nav>
              </div>
            )}
            {/* <----Agent----> */}
            {role === "agent" || role=== "fraud" ? (
              <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="font-lora ">
                  {/* Agent Profile */}
                  <MenuItem
                    label={"Agent Profile"}
                    address={"/dashboard/agent-profile"}
                    icon={CgProfile}
                  ></MenuItem>
                  <MenuItem
                    label={"Add Property"}
                    address={"/dashboard/add-property"}
                    icon={BsFillHouseAddFill}
                  ></MenuItem>
                  <MenuItem
                    label={"My Added Properties"}
                    address={"/dashboard/my-added-properties"}
                    icon={BsFillHousesFill}
                  ></MenuItem>
                  <MenuItem
                    label={"My Sold Properties"}
                    address={"/dashboard/my-sold-properties"}
                    icon={BsHouseCheckFill}
                  ></MenuItem>
                  <MenuItem
                    label={"Requested Properties"}
                    address={"/dashboard/requested-properties"}
                    icon={BsHouseExclamationFill}
                  ></MenuItem>
                </nav>
              </div> 
            ): ""}
            {/* <----Admin----> */}
            {role === "admin" && (
              <div className="flex  flex-col justify-between flex-1 mt-6">
                <nav className="font-lora ">
                  {/* Admin Profile */}
                  <MenuItem
                    label={"Admin Profile"}
                    address={"/dashboard/admin-profile"}
                    icon={MdAdminPanelSettings}
                  ></MenuItem>
                  <MenuItem
                    label={"Manage Properties"}
                    address={"/dashboard/manage-properties"}
                    icon={BsFillHouseGearFill}
                  ></MenuItem>
                  <MenuItem
                    label={"Manage Users"}
                    address={"/dashboard/manage-users"}
                    icon={FaUsersGear}
                  ></MenuItem>
                  <MenuItem
                    label={"Manage Reviews"}
                    address={"/dashboard/manage-reviews"}
                    icon={RiUserStarFill}
                  ></MenuItem>
                  <MenuItem
                    label={"Advertise Property"}
                    address={"/dashboard/advertise-property"}
                    icon={RiAdvertisementFill}
                  ></MenuItem>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
