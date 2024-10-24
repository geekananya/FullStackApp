import React from "react";
import {createBrowserRouter} from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Posts from "../Pages/Posts";
import ProtectedRoute from "../Layout/ProtectedRoute";
import Dashboard from '../Layout/Dashboard'
import CreatePost from "../Pages/CreatePost";
import EditPost from "../Pages/EditPost";
import DeletePost from "../Pages/DeletePost";
import AuthorisedRoute from "../Layout/AuthorisedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout Component={Login}/> ,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <HomeLayout Component={Login}/>
  },
  {
    path: "/register",
    element: <HomeLayout Component={Register}/>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard Page={Posts}/>,
      },
      {
        path: "posts",
        element: <Dashboard Page={Posts}/>,
      },
      {
        path: "createpost",
        element: <Dashboard Page={CreatePost}/>,
      },
      {
        path: "editpost/:id",
        element: <Dashboard Page={AuthorisedRoute} Component={EditPost}/>,
      },
      {
        path: "deletepost/:id",
        element: <Dashboard Page={AuthorisedRoute} Component={DeletePost}/>,
      },
    ],
  },
]);

export default router;