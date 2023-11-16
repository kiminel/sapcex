"use client";
import { useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

const LaunchDetails = () => {
  const searchParams = useSearchParams();
  const launchInfo = searchParams.get("launch");
  const result = JSON.parse(launchInfo);
  console.log(result);

  if (!result) {
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

  return (
    <div>
      <Typography variant="h4">Hellllooo daaaar</Typography>
    </div>
  );
};

export default LaunchDetails;
