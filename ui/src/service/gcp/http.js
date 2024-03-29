import config from "../../config.json";
import axios from "axios";
import log from '../../utils/logger';
import routes from './routes.json'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const BASE_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  HOST = config.gcp.endpoint;

let http = axios.create({
  baseURL: HOST,
  headers: BASE_HEADERS
});

const refreshAuthLogic = async failedRequest => {
  const body = {username: config.gcp.username, orgName: config.gcp.orgName, role: config.gcp.role};
  return await axios.post(HOST + routes.base_login_route.name, body, {headers: BASE_HEADERS})
    .then(async tokenRefreshResponse => {  
        localStorage.setItem('token', tokenRefreshResponse.data.token);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
        console.log(failedRequest)
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
    let message = 'GCP has return status code ' + error.response.status;
    log.log('error', 'error');
    return Promise.reject(message);
  }
);

export default http;