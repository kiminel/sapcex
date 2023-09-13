"use client";
import "./globals.css";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpaceX",
  description: "SpaceX Clone",
};

export default function RootLayout({ children }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = "https://api.spacexdata.com/v4/launches/query";

  const getQueryBody = (pageNumber) => {
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
  };

  const fetchLaunchData = async (pageNumber) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getQueryBody(pageNumber)),
      });

      if (!response.ok) {
        console.log("Network response was not ok: ", response);
      }

      const launchData = await response.json();
      console.log(launchData);
      setData(launchData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchLaunchData(currentPage);
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchData(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    fetchData(currentPage - 1);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {data["docs"] ? (
          <>
            <Header />
            {children}
            <Footer />
          </>
        ) : (
          <div>Loading</div>
        )}
      </body>
    </html>
  );
}
