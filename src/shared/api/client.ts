import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-type": "application/json",
  },
});

export default client;
