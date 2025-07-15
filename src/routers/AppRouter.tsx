import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import { Detail } from "../pages/Detail";
import { Home } from "../pages/Home";
import { PrivateRouter } from "./PrivateRouter";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { NotFound } from "../pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />} />
        <Route path="/products/detail/:id" element={<Detail />} />
        <Route path="/users/login" element={<Login />} />
        <Route element={<PrivateRouter />}>
          <Route path="/users/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route errorElement={<NotFound />} />
    </>
  )
);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};