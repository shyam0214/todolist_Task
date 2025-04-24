const Bottleneck = require("bottleneck");
const axios = require("axios");
require("dotenv").config();

const limiter = new Bottleneck({
  minTime: 200, 
  maxConcurrent: 1
});

const axiosInstance = axios.create({
  baseURL: "https://api.todoist.com/rest/v2",
  headers: {
    Authorization: `Bearer ${process.env.TODOIST_TOKEN}`
  }
});

const fetchWithRateLimit = limiter.wrap(async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
});

module.exports = fetchWithRateLimit;
