import React, { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  // const naviagtion = useNavigation();
  return (
    <Fragment>
      <MainNavigation />
      <main>
        {/* {naviagtion.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </Fragment>
  );
};
