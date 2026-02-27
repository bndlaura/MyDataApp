import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav/BottomNav";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNav />
    </>
  );
}
