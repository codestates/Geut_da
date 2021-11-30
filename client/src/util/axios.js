import axios from "axios";

const baseURL =
  "http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL,
});

//axios 요청을 할때 중간에서 가로챔
instance.interceptors.request.use(
  function (config) {
    const userInfo = localStorage.getItem("userInfo");

    config.headers = {
      "Content-Type": "application/json",
    };

    if (userInfo) {
      config.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
