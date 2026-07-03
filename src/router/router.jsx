import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../page/Home";
import AddMovieForm from "../components/AddMovieForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/add-movie',
            element: <AddMovieForm></AddMovieForm>
        }
    ]
  },
]);