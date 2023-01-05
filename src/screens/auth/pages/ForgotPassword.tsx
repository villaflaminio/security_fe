import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import React from "react";
import {RoutesPaths} from "../../../navigation/root.routes";
import BoxedLayout from "../../../components/BoxedLayout";


const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
      <BoxedLayout>
          <Typography component="h1" variant="h5">
              Sign up
          </Typography>
          <Button
              onClick={() => navigate(RoutesPaths.LOGIN.toString())}
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
          >
              Back to login
          </Button>
      </BoxedLayout>
  );
};

export default ForgotPassword;
