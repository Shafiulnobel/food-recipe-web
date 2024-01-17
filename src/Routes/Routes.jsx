import Main from "../Layout/Main";

import {
  createBrowserRouter
} from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Create from "../pages/CRUD/Create/Create";
import Edit from "../pages/CRUD/Edit/Edit";
import RecipeDetails from "../pages/RecipeDetails/RecipeDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/create',
        element: <Create />
      },
      {
        path: '/recipes/:id',
        element: <RecipeDetails />,
        loader: ({ params }) => fetch(`https://recipe-web-app-server.vercel.app/recipes/${params.id}`)
      },
      {
        path: '/edit/:id',
        element: <Edit />,
        loader: ({ params }) => fetch(`https://recipe-web-app-server.vercel.app/recipes/${params.id}`)
      },
    ]
  }
]);

export default router;