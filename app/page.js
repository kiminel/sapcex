"use client";
import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Box, Button, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Launches from "./components/Launches";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CountOnScroll from "./utils/CountOnScroll";
import BouncingWord from "./utils/BouncingWord";

export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = "https://api.spacexdata.com/v4/launches/query";

  const appTheme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      action: {
        disabledBackground: "#949494",
        disabled: "#d3d3d3",
      },
    },
    typography: {
      h1: { fontSize: "8rem", fontWeight: 600 },
      h2: { fontSize: "6rem" },
      h3: { fontSize: "4rem" },
    },
  });

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const variant = isMediumScreen ? "h3" : "h2";

  const launchesRef = useRef(null);

  function getQueryBody(pageNumber) {
    return {
      query: {
        upcoming: false,
        success: true,
      },
      options: {
        page: pageNumber,
        limit: 9,
        select: {
          id: 1,
          name: 2,
          links: 3,
          date_utc: 4,
          flight_number: 5,
        },
        populate: [
          {
            path: "rocket",
            select: {
              id: 1,
              name: 2,
              type: 3,
              description: 4,
              height: 5,
              diameter: 6,
              mass: 7,
              flickr_images: 8,
            },
          },
          {
            path: "crew",
            select: {
              id: 1,
              name: 2,
              agency: 3,
              image: 4,
            },
          },
          {
            path: "payloads",
            select: {
              id: 1,
              name: 2,
              type: 3,
              orbit: 4,
              reference_system: 5,
              regime: 6,
            },
          },
          {
            path: "capsules",
            select: {
              id: 1,
              type: 2,
              status: 3,
              serial: 4,
            },
          },
          {
            path: "launchpad",
            select: {
              id: 1,
              name: 2,
              full_name: 3,
              locality: 4,
              region: 5,
              latitude: 6,
              longitude: 7,
              details: 8,
            },
          },
        ],
        sort: {
          flight_number: "desc",
        },
      },
    };
  }

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getQueryBody(pageNumber)),
      });

      if (!response.ok) {
        console.error("Network failure");
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const scrollAfterTimeOut = () => {
    return setTimeout(() => {
      if (launchesRef.current) {
        launchesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchData(currentPage + 1);
    scrollAfterTimeOut();
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    fetchData(currentPage - 1);
    scrollAfterTimeOut();
  };

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Box sx={{ height: 1, width: 1, bgcolor: "black" }}>
          {data["docs"] ? (
            <>
              <Header />

              <Box sx={{ position: "relative" }}>
                <>
                  <Box
                    component="img"
                    sx={{
                      width: 1,
                      height: 1,
                      paddingBottom: "12px",
                      paddingTop: isMediumScreen ? "55px" : "0px",
                    }}
                    alt="Launch cover"
                    src={data["docs"][0].rocket.flickr_images[4]}
                  />

                  {!isMediumScreen && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "30%",
                        left: "15%",
                        color: "white",
                      }}
                    >
                      <CountOnScroll numberToCount={data["totalDocs"]} />
                      <Typography
                        sx={{
                          textTransform: "uppercase",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        Total SpaceX Launches
                      </Typography>
                    </Box>
                  )}
                </>
              </Box>

              {isMediumScreen && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    py: 4,
                    color: "white",
                  }}
                >
                  <CountOnScroll numberToCount={data["totalDocs"]} />
                  <Typography sx={{ textTransform: "uppercase" }}>
                    Total SpaceX Launches
                  </Typography>
                </Box>
              )}

              <Typography
                variant={variant}
                sx={{
                  color: "white",
                  textAlign: "center",
                  letterSpacing: "12px",
                  pt: 4,
                  pb: 12,
                }}
              >
                <BouncingWord text={"Explore"} />
              </Typography>

              <Container maxWidth={false} sx={{ bgcolor: "black" }}>
                <Box sx={{ flexDirection: "column" }}>
                  <Box ref={launchesRef}>
                    <Launches launches={data["docs"]} />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                      py: 2,
                      gap: 1,
                    }}
                  >
                    <Typography>
                      Page {data["page"]} / {data["totalPages"]}{" "}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, py: 4 }}>
                      <Button
                        variant="contained"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        sx={{ bgcolor: "white", color: "black" }}
                      >
                        Prev Page
                      </Button>

                      <Button
                        variant="contained"
                        onClick={nextPage}
                        disabled={currentPage === data["totalPages"]}
                        sx={{ bgcolor: "white", color: "black" }}
                      >
                        Next Page
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Container>

              <Footer />
            </>
          ) : (
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
          )}
        </Box>
      </ThemeProvider>
    </>
  );
}
