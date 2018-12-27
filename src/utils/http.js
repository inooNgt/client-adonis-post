import axios from 'axios';
import config from 'utils/config';
import APIMAP from 'utils/apimap';
import Qs from 'qs';

const http = options => {
  options = setHeaders(url, options);
  if (typeof options.url !== 'undefined') {
    options.url = config.host + options.url;
  }

  return axios(options);
};

const get = (url, options) => {
  options = setHeaders(url, options);

  if (typeof url !== 'undefined') {
    url = config.host + url;
  }

  return axios.get(url, options);
};

const del = (url, options) => {
  options = setHeaders(url, options);
  if (typeof url !== 'undefined') {
    url = config.host + url;
  }

  return axios.delete(url, options);
};

const post = (url, data, options) => {
  options = setHeaders(url, options);
  if (typeof url !== 'undefined') {
    url = config.host + url;
  }

  let disableQs =
    options &&
    options.headers &&
    options.headers['Content-Type'] === 'image/png';

  if (typeof data === 'object' && !disableQs) data = Qs.stringify(data);
  // if (typeof data === "object") {
  //   data = encodeURI(
  //     Qs.stringify(data, {
  //       encode: false
  //     })
  //   );
  // }

  return axios.post(url, data, options);
};

function setHeaders(url, options) {
  const isAuth = checkAuth(url);
  const token = (localStorage.getItem(config.keys.token) || '').replace(
    /^"|"$/g,
    ''
  );

  options = options || {};
  if (isAuth) {
    if (!options.headers) options.headers = {};

    options.headers = Object.assign(options.headers, {
      Authorization: 'Bearer ' + token
    });
  }

  return options;
}

function checkAuth(url) {
  let result = false;
  for (let key in APIMAP.auth) {
    if (APIMAP.auth[key] === url) {
      result = true;
      break;
    }
  }
  return result;
}

export { http, get, post, del };
