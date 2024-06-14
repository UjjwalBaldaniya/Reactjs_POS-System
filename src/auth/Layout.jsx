import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="row">
      <div className="d-none d-lg-block col-3 col-xl-2 p-0">
        <Sidebar />
      </div>
      <div
        style={{ height: "100vh", overflow: "auto" }}
        className="col col-xl-10 px-4 "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
