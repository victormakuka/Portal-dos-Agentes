import axios from "axios";
const api = axios.create({
  baseURL: /*"https://api-sga-iwsq.onrender.com"*/ "/",
timeout: 20000
})
export default api;