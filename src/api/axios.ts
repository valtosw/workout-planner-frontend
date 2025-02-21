import axios from "axios";

export const BASE_URL = "http://localhost:5269/api";

export default axios.create({
  baseURL: BASE_URL,
});
