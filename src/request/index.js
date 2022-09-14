import axios from "axios";
let service = axios.create({
  // baseURL: 'http://124.223.89.194:3000/',
  baseURL: "http://localhost:3000/",
  timeout: 3000,
});
export default service;
