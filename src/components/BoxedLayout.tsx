import {AppBar, GlobalStyles, IconButton, Toolbar, useTheme} from "@mui/material";
import React, { useState } from "react";
import {Box} from "@mui/material";
import Logo from "./Logo";

type BoxedLayoutProps = {
  children: React.ReactNode;
};

const BoxedLayout = ({ children }: BoxedLayoutProps) => {

  return (
    <React.Fragment>
        <Box
            sx={{
                height: 100,
                backgroundColor: 'transparent',
            }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo sx={{ mb: 2 }} />
          {children}

        </Box>
    </React.Fragment>
  );
};

export default BoxedLayout;
