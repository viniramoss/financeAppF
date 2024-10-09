import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from "./pages/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  }
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
