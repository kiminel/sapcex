import { Grid, Paper } from "@mui/material";
import Launch from "./Launch";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Launches = ({ launches }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const gridLayout = isMediumScreen ? 12 : 4;

  return (
    <Grid container spacing={4} sx={{ py: 4 }}>
      {launches.map((launch) => (
        <Grid key={launch.id} item xs={gridLayout}>
          <Paper sx={{ boxShadow: 0, border: "none" }}>
            <Launch props={launch} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Launches;
