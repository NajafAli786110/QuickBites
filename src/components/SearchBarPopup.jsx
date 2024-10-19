import { SearchRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  keyframes,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ProductsData } from "../appConstantData/ProductsData";

const SearchBarPopup = ({ setIsOpenSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  //   Search Bar Handler
  const SearchBarHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpenSearch(false);
    }, 300);
    setSearchQuery("");
  };

  // Animation Here
  const slideInFromUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
    100% {
    opacity: 1;
    transform: translateY(0%);
    }
  `;

  const slideInFromDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
    100% {
    opacity: 0;
    transform: translateY(-100%);
    }
  `;

  // Filter Product
  const filterProductByQuery = ProductsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          height: {xs: "100vh", md: "80vh"},
          width: "100%",
          padding: "30px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          justifyContent: "start",
          position: "fixed",
          top: 0,
          left: 0,
          overflow: "hidden",
          animation: `${
            isClosing ? slideInFromDown : slideInFromUp
          } 0.3s ease-in-out`,
          backgroundColor: "var(--light-grey)",
          zIndex: "999",
        }}
      >
        {/* Search Bar */}
        <Box
          sx={{
            width: { xs: "80%", md: "100%" },
            display: "flex",
            alignItems: "center",
            padding: { xs: "12px", md: "30px" },
            maxWidth: "900px",
            backgroundColor: "white",
            borderRadius: "100px",
          }}
        >
          <input
            type="text"
            name="search_filter"
            id="search_filter"
            placeholder="Search What You Want ...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              outline: 0,
              border: 0,
              fontFamily: "Poppins",
              fontSize: { xs: "12px", md: "16px" },
              textTransform: "uppercase",
              fontWeight: "500",
            }}
          />
          <Button
            variant="contained"
            startIcon={<SearchRounded sx={{ marginRight: "-10px" }} />}
            onClick={SearchBarHandler}
            sx={{
              backgroundColor: "var(--secondary-color)",
              borderRadius: { xs: "50px", md: "20px" },
              textTransform: "capitalize",
              display: "flex",
              fontSize: { xs: "0px", md: "16px" },
              gap: "0px",
              minWidth: { xs: "50px", md: "64px" },
              padding: { xs: "14px 0px", md: "16px" },
            }}
          >
            Search
          </Button>
        </Box>

        {/* Product Bar */}
        <Box
          sx={{
            width: { xs: "80%", md: "100%" },
            display: "flex",
            gap: "16px",
            alignItems: "start",
            padding: { xs: "16px", md: "30px" },
            maxWidth: "900px",
            backgroundColor: "white",
            borderRadius: "30px",
            overflowY: "scroll",
          }}
        >
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {filterProductByQuery.length > 0 ? (
              filterProductByQuery.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: {xs: "16px", md: "8px"},
                    padding: "16px",
                    borderRadius: "10px",
                    border: "1px solid lightgrey",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.2rem" },
                      lineHeight: { xs: "1.2rem", md: "1.4rem" },
                      letterSpacing: "-0.6px",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.7rem", md: "0.9rem" },
                      letterSpacing: "-0.4px",
                      marginTop: '-10px'
                    }}
                  >
                    {item.description}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                No Products Found!
              </Typography>
            )}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SearchBarPopup;