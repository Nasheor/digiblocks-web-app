import config from "../../config.json";
import axios from "axios";
import log from '../../utils/logger';
import routes from './routes.json'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const BASE_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
},
  HOST = config.iota.endpoint;

let http = axios.create({
  baseURL: HOST,
  headers: BASE_HEADERS
});

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const refreshAuthLogic = async failedRequest => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"]  = 0;
  const body = { username: config.iota.user_id, password: config.iota.password };
  return await axios.post(HOST + routes.base_login_route.name, body, { headers: BASE_HEADERS })
    .then(async tokenRefreshResponse => {
      console.log(tokenRefreshResponse.data);
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
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  const token = localStorage.getItem('token');
  if (!_.isNil(token))
    config.headers['X-Authorization'] = `Bearer ${token}`;
  return config;
},
  (error) => {
    let message = 'IOTA has return status code ' + error.response.status;
    log.log('error', 'error');
    return Promise.reject(message);
  }
);

export default http;