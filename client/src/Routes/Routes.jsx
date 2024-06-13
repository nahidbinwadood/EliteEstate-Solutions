import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import Login from "../Pages/Login/Login";
import Registration from "./../Pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import Property_Details from "../Pages/Property_Details/Property_Details";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Agent_Profile from "../Pages/Dashboard/Agent/Agent_Profile/Agent_Profile";
import Add_Property from "./../Pages/Dashboard/Agent/Add-Property/Add_Property";
import My_Added_Properties from "../Pages/Dashboard/Agent/My_Added_Properties/My_Added_Properties";
import Update_Property from "../Pages/Dashboard/Agent/Update_Property/Update_Property";
import Manage_Users from "../Pages/Dashboard/Admin/Manage_Users/Manage_Users";
import Manage_Properties from "../Pages/Dashboard/Admin/Manage_Properties/Manage_Properties";
import Wishlist from "../Pages/Dashboard/User/Wishlist/Wishlist";
import Make_Offer from "../Pages/Dashboard/User/Make_Offer/Make_Offer";
import Property_Bought from "../Pages/Dashboard/User/Property_Bought/Property_Bought";
import My_Sold_Properties from "../Pages/Dashboard/Agent/My_Sold_Properties/My_Sold_Properties";
import Request_Properties from "../Pages/Dashboard/Agent/Request_Properties/Request_Properties";
import Payment from "../Pages/Dashboard/User/Payment/Payment";
import My_Reviews from "../Pages/Dashboard/User/My_Reviews/My_Reviews";
import Manage_Reviews from "../Pages/Dashboard/Admin/Manage_Reviews/Manage_Reviews";
import Advertise_Property from "../Pages/Dashboard/Admin/Advertise_Property/Advertise_Property";
import Error_Page from "../Pages/Error_Page/Error_Page";
import Admin_Route from "./Admin_Route";
import Admin_Profile from "../Pages/Dashboard/Admin/Admin_Profile/Admin_Profile";
import Agent_Route from "./Agent_Route";
import User_Profile from "../Pages/Dashboard/User/User_Profile/User_Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error_Page></Error_Page>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-properties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/property-details/:id",
        element: (
          <PrivateRoute>
            <Property_Details></Property_Details>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register-page",
    element: <Registration></Registration>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //user:
      {
        path: "/dashboard/user-profile",
        element: (
          <PrivateRoute>
            <User_Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/make-offer/:id",
        element: (
          <PrivateRoute>
            <Make_Offer />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/property-bought",
        element: (
          <PrivateRoute>
            <Property_Bought />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-reviews",
        element: (
          <PrivateRoute>
            <My_Reviews />
          </PrivateRoute>
        ),
      },

      // Agent :
      {
        path: "/dashboard/agent-profile",
        element: (
          <PrivateRoute>
            <Agent_Route>
              <Agent_Profile />
            </Agent_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-property",
        element: (
          <PrivateRoute>
            <Agent_Route>
              <Add_Property />
            </Agent_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-added-properties",
        element: (
          <PrivateRoute>
            <Agent_Route>
              <My_Added_Properties />
            </Agent_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-property/:id",
        element: (
          <PrivateRoute>
            <Agent_Route>
              <Update_Property />
            </Agent_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-sold-properties",
        element: (
          <PrivateRoute>
            <Agent_Route>
              <My_Sold_Properties />
            </Agent_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/requested-properties",
        element: (
          <PrivateRoute>
            <Agent_Route>
              <Request_Properties />
            </Agent_Route>
          </PrivateRoute>
        ),
      },

      //Admin:
      {
        path: "/dashboard/admin-profile",
        element: (
          <PrivateRoute>
            <Admin_Route>
              <Admin_Profile />
            </Admin_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-properties",
        element: (
          <PrivateRoute>
            <Admin_Route>
              <Manage_Properties />
            </Admin_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <Admin_Route>
              <Manage_Users />
            </Admin_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: (
          <PrivateRoute>
            <Admin_Route>
              <Manage_Reviews />
            </Admin_Route>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/advertise-property",
        element: (
          <PrivateRoute>
            <Admin_Route>
              <Advertise_Property />
            </Admin_Route>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
