"use client";
import Image from "next/image";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        width: 1,
        position: "fixed",
        bgcolor: "black",
        color: "white",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: "15px",
        boxShadow: 8,
      }}
    >
      <Image src="/spacex.jpg" alt="SpaceX" height={40} width={200} />
    </Box>
  );
};

export default Header;
