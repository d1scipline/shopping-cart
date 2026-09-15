import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/routes";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
