"use client";
import { useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import BouncingWord from "@/app/utils/BouncingWord";

const LaunchDetails = () => {
  const searchParams = useSearchParams();
  const launchInfo = searchParams.get("launch");
  const results = JSON.parse(launchInfo);

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
          pt: 12,
          bgcolor: "black",
        }}
      >
        {/* <Typography
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "white",
          }}
        >
          {results.name}
        </Typography> */}
        <BouncingWord text={"Explore"} />
      </Box>
    </Box>
  );
};

export default LaunchDetails;
