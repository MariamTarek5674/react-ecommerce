import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
export default function MainLayout() {
  return (
    <>
      <NavigationBar />
      <div className=" mx-auto py-16 px-10 mt-10 md:py-10 ">
        <Outlet />
      </div>
    </>
  )
}



