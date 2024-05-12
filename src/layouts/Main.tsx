import React from "react";

import { Navbar } from "@/components/Navbar";

export const Main = () => {
  return (
    <React.Fragment>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Navbar />
    </React.Fragment>
  );
};
