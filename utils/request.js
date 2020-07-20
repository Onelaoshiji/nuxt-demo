import { Toast } from "vant";
import axios from 'axios'
import Cookie from 'js-cookie'

// 设定访问根地址
// let baseUrl = 'http://rheumatism.medsci.cn';

const service = axios.create({
  timeout: 15000
});
var success_show = false
var error_show = false
// request拦截器
service.interceptors.request.use(
  config => {
    if(Cookie.get('token')) {
      config.headers['token'] = Cookie.get('token')
      config.headers['userid'] = Cookie.get('userid')
    }
    if(config && config.data && config.data.success_dialog) {
      success_show = true
      delete config.data.success_dialog
    }
    if(config && config.data && config.data.error_dialog) {
      error_show = true
      delete config.data.error_dialog
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject("error");
    } else {
      if(response.data.status === 200 && success_show) {
        Toast.success(response.data.msg)
        success_show = false
      }
      if(response.data.status !== 200 && error_show) {
        Toast.fail(response.data.msg)
        error_show = false
      }
      return response.data;
    }
  },
  error => {
    if (error.response.data.message || error.response.data.message) {
      Toast.fail(error.response.data.message || error.response.data.massage);
    }
    if(error_show) {
      Toast.fail('失败')
      error_show = false
    }
    return Promise.reject(error);
  }
);

export default service;
