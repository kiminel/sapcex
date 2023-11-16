"use client";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography } from "@mui/material";
import BouncingWord from "@/app/utils/BouncingWord";

const LaunchDetails = () => {
  const searchParams = useSearchParams();
  const launchInfo = searchParams.get("launch");
  const results = JSON.parse(launchInfo);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const variant = isMediumScreen ? "h3" : "h2";

  if (!results) {
    return (
      <Box
        sx={{
          width: 1,
          height: "100vh",
          bgcolor: "black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ color: "white", p: 40 }}>
          Loading...
        </Typography>
      </Box>
    );
  }
  console.log(results);
  return (
    <Box
      sx={{
        width: 1,
        height: "100vh",
        bgcolor: "black",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: 1,
          marginTop: 8,
          pt: 8,
          bgcolor: "black",
        }}
      >
        <Typography
          variant={variant}
          sx={{
            color: "white",
            textAlign: "center",
            letterSpacing: "12px",
            pb: 12,
          }}
        >
          <BouncingWord text={results.name} />
        </Typography>
      </Box>
    </Box>
  );
};

export default LaunchDetails;
