import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Orders from "../pages/Orders";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
