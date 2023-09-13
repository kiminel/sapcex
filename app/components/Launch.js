import moment from "moment";
import { Box, Button, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Launch = ({ props }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const getRandomImage = (flickrImageArray) => {
    const length = flickrImageArray.length;
    const randomIndex = Math.floor(length * Math.random());
    return flickrImageArray[randomIndex];
  };

  return (
    <Button
      variant="contains"
      sx={{
        width: 1,
        height: 1,
        minHeight: isLargeScreen ? "0px" : "480px",
        bgcolor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
          bgcolor: "black",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        sx={{
          color: "white",
          display: "flex",
          width: 1,
          justifyContent: "end",
          mr: 2,
        }}
      >
        Launch {props.flight_number}
      </Typography>
      <Box
        component="img"
        sx={{
          height: 1,
          width: 1,
          objectFit: "cover",
        }}
        alt="Launch cover"
        src={getRandomImage(props.rocket.flickr_images)}
      />

      <Box
        sx={{
          mx: 2,
          color: "white",
          display: "flex",
          flexDirection: "column",
          py: 1,
          gap: 1,
        }}
      >
        <Typography variant="h4">{props.name}</Typography>
        <Typography>{moment(props.date_utc).format("MMMM Do YYYY")}</Typography>
      </Box>
    </Button>
  );
};

export default Launch;
