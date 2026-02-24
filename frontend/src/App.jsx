import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Project from "./components/Project";
import Template from "./components/Template";
import CreateDesign from "./components/CreateDesign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Project />,
      },
      {
        path: "/templates",
        element: <Template />,
      },
    ],
  },
  {
    path: "/design/create",
    element: <CreateDesign />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
