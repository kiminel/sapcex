"use client";
import { Box, Link, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        height: 85,
        display: "flex",
        flexDirection: isMediumScreen ? "column" : "normal",
        alignItems: "center",
        justifyContent: isMediumScreen ? "normal" : "space-between",
        gap: 1,
        px: 4,
        py: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 6 }}>
        <Link href="https://www.instagram.com/spacex/" target="_blank">
          <InstagramIcon sx={{ width: 20, height: 20, color: "white" }} />
        </Link>
        <Link href="https://twitter.com/SpaceX" target="_blank">
          <TwitterIcon sx={{ width: 20, height: 20, color: "white" }} />
        </Link>
        <Link href="https://www.youtube.com/spacex" target="_blank">
          <YouTubeIcon sx={{ width: 20, height: 20, color: "white" }} />
        </Link>
      </Box>

      <Link href="https://www.spacex.com/" target="_blank" underline="none">
        <Typography
          sx={{
            textDecoration: "none",
            color: "white",
            fontSize: "16px",
            "&:hover": {
              fontSize: "18px",
            },
          }}
        >
          Official SpaceX Website
        </Typography>
      </Link>

      <Box>
        <Typography
          sx={{
            px: 2,
            color: "#949494",
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {new Date().getFullYear()} &copy; All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
