import config from "../config.json";
import axios from "axios";
import log from '../utils/logger';
import routes from './routes.json'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const BASE_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  HOST = config.thingsboard.endpoint;

let http = axios.create({
  baseURL: HOST,
  headers: BASE_HEADERS
});

const refreshAuthLogic = async failedRequest => {
  const body = {username: config.thingsboard.username, password: config.thingsboard.password};
  console.log(body)
  return await axios.post(HOST + routes.base_login_route.name, body, {headers: BASE_HEADERS})
    .then(async tokenRefreshResponse => {  
        localStorage.setItem('token', tokenRefreshResponse.data.token);
        failedRequest.response.config.headers['X-Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
        return await Promise.resolve();
        }).catch(err => {
              return Promise.reject(err);
    });
};
/**
 * Automatically refresh the user token on 401 error.
 */
createAuthRefreshInterceptor(http, refreshAuthLogic);
/**
 * Add the token to every call.
 */
http.interceptors.request.use(function (config) {

    const token = localStorage.getItem('token');
    if (!_.isNil(token))
      config.headers['X-Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    let message = 'ThingsBoard has return status code ' + error.response.status;
    log.log('error', 'error');
    return Promise.reject(message);
  }
);

export default http;