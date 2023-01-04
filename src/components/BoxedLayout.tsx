import {AppBar, GlobalStyles, IconButton, Toolbar, useTheme} from "@mui/material";
import React, { useState } from "react";
import {Box} from "@mui/material";
import Logo from "./Logo";

type BoxedLayoutProps = {
  children: React.ReactNode;
};

const BoxedLayout = ({ children }: BoxedLayoutProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
    const theme = useTheme();

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

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
          {/*<Box>*/}
          {/*  <SettingsDrawer*/}
          {/*    onDrawerToggle={handleSettingsToggle}*/}
          {/*    open={settingsOpen}*/}
          {/*  />*/}
          {/*</Box>*/}
        </Box>
    </React.Fragment>
  );
};

export default BoxedLayout;
