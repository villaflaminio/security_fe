import {AdminPaths} from "../../../navigation/admin.routes";
import React from "react";
import {Avatar, Box, Grid, ListItemAvatar, Tab, Tabs, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useAppSelector} from "../../../store/store.config";
import {NavLink, Outlet} from "react-router-dom";

const profileMenuItems = [
  {
    key: "Information",
      path: AdminPaths.INFORMATION.toString(),
  },
  {
    key: "Password",
      path: AdminPaths.PASSWORD.toString(),
  },
];

const ProfileAdmin = () => {
    const {user} = useAppSelector(state => state.authReducer);


  return (
    <React.Fragment>
      <Grid container spacing={12}>
        <Grid item xs={12} md={4} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
              <ListItemAvatar>
                  {user && (
                      <Avatar alt="user" src={user?.imageUrl}/>
                  )}
                  {!user && (
                      <Avatar>
                          <AccountCircleIcon/>
                      </Avatar>
                  )}
              </ListItemAvatar>
            <Typography
              component="div"
              variant="h4"
            >{`${user?.name} ${user?.email}`}</Typography>
              {user?.roles.map((role) => (
                  <Typography variant="body2">
                      {role.name}
                  </Typography>
              ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={8} marginTop={3}>
          <Box sx={{ mb: 4 }}>
            {/*<Tabs aria-label="profile nav tabs" value={false}>*/}
            {/*  {profileMenuItems.map((item) => (*/}
            {/*    <Tab*/}
            {/*      key={item.key}*/}
            {/*      end={true}*/}
            {/*      component={NavLink}*/}
            {/*      label={(item.key)}*/}
            {/*      to={item.path}*/}
            {/*    />*/}
            {/*  ))}*/}
            {/*</Tabs>*/}
          </Box>
            <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileAdmin;
