import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
function RootLayOut() {
  return (
    <div>
      <div>
        <div>
          <ScrollRestoration />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayOut;
