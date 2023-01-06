import {useState} from "react";
import {Box} from "@mui/material";
import AdminDrawer from "../components/AdminDrawer";
import {useSettings} from "../../../providers/SettingsProvider";

const AdminLayout = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { collapsed, open, toggleDrawer } = useSettings();

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminDrawer
        collapsed={collapsed}
        mobileOpen={open}
        onDrawerToggle={toggleDrawer}
        onSettingsToggle={handleSettingsToggle}
      />
      {/*<SettingsDrawer*/}
      {/*  onDrawerToggle={handleSettingsToggle}*/}
      {/*  open={settingsOpen}*/}
      {/*/>*/}
      {/*<Box component="main" sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 } }}>*/}
      {/*  <Toolbar />*/}
      {/*  <QueryWrapper>*/}
      {/*    <Outlet />*/}
      {/*  </QueryWrapper>*/}
      {/*</Box>*/}
    </Box>
  );
};

export default AdminLayout;
