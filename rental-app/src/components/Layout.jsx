import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
const backgroundGradient = {
  background: "linear-gradient(135deg, #232526 0%, #414345 40%,rgb(46, 60, 131) 100%)",
  minHeight: "100vh",
};

const getPageTitle = (pathname) => {
  const titleMap = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/equipment": "Equipment Management",
    "/rentals": "Rental Management",
    "/maintenance": "Maintenance Schedule",
    "/calendar": "Calendar",
    "/notifications": "Notifications",
  };
  return titleMap[pathname] || "Dashboard";
};

const Layout = ({ children }) => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <Box display="flex" height="100vh" sx={backgroundGradient}>
      <SideBar />

      <Box flex={1} display="flex" flexDirection="column" height="100vh">
        <Navbar page={pageTitle} />

        <Box flex={1} overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
