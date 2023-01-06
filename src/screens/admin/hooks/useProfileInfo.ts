import axios from "axios";
import React, {useEffect} from "react";
import {UtenteModel} from "../../../models/utente.model";
import {useAppDispatch, useAppSelector} from "../../../store/store.config";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../../service/auth.service";




export function useProfileInfo() {
  const [localUser, setUser] = React.useState<UtenteModel>();
  const authUser = useAppSelector(state => state.authReducer.user);
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  async function getCurrentUser() {
    const user = await AuthService.getCurrentUser();
    setUser(user);
  }


  useEffect(() => {
    if (authUser && isAuth) {
      setUser(authUser);
    } else {
      getCurrentUser();
    }
  }, [])

  return localUser;
}
