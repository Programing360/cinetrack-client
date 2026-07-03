import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../page/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
            path:'/',
            element: <Home></Home>
        }
    ]
  },
]);