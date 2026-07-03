import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../page/Home";
import AddMovieForm from "../components/AddMovieForm";
import PageNotFound from "../components/PageNotFound";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-movie",
        element: <AddMovieForm></AddMovieForm>,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);
