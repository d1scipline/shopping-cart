import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import NavBar from "./components/NavBar/NavBar";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useOutletContext,
} from "react-router";
import routes from "./routes/routes";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
