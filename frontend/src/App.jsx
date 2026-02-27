import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Project from "./components/Project";
import Template from "./components/Template";
import CreateDesign from "./components/CreateDesign";
import Main from "./pages/Main";
import Index from "./pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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
  {
    path: "/design/:id/edit",
    element: <Main />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
