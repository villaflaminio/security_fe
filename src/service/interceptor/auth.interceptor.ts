import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AuthService} from 'service/auth.service';
import {RootStore} from 'store/store.config';
import {appAxios} from 'service/axios.config';
import {uiManagerActions} from 'store/uiManager/uiManager.action';
import {AuthActions} from 'store/auth/auth.action';

const interceptor = (store:RootStore) => {

//request interceptor to add the auth token header to requests
    appAxios.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const accessToken = AuthService.getAccessToken()
            //console.log('Interceptor: ', accessToken)
            if (accessToken && config.headers) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );


//response interceptor to refresh token on receiving token expired error
    appAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            const originalRequest = error.config;
            if (error.response.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = AuthService.getRefreshToken();

                console.log('Get refresh token from data: ', refreshToken)
                  return axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/refreshTokenLion`, {},{
                          params: {
                              refreshToken: refreshToken
                          }
                      })
                      .then((res:AxiosResponse<any>) => {
                          console.log('Refresh token request sent', res)
                          if (res.status === 200) {
                              AuthService.setAccessToken(res.data.token);
                              AuthService.setRefreshToken(res.data.refreshToken)

                              console.log("Access token refreshed!");
                              return appAxios(originalRequest);
                          }
                          store.dispatch(AuthActions.logoutAction())
                          store.dispatch(uiManagerActions.showToast({
                              title: 'common:ERRORS:TIMEOUT_SESSION:TITLE',
                              description: 'common:ERRORS:TIMEOUT_SESSION:DESCRIPTION',
                              isI18nKey: true,
                              status: 'warning',
                              isClosable: true,
                          }))
                      }).catch((err) => {
                          console.log('Refresh token request error', err)
                          store.dispatch(AuthActions.logoutAction())
                          store.dispatch(uiManagerActions.showToast({
                              title: 'common:ERRORS:TIMEOUT_SESSION:TITLE',
                              description: 'common:ERRORS:TIMEOUT_SESSION:DESCRIPTION',
                              isI18nKey: true,
                              status: 'warning',
                              isClosable: true,
                          }))
                      })
            }
            return Promise.reject(error);
        }
    );
}

export default {
    interceptor
}

