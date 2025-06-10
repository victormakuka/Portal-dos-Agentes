import axios from "axios";
const api = axios.create({
  baseURL: "https://api-sga-iwsq.onrender.com",
 timeout: 10000
})
export default api;