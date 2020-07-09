const axios = require("axios");
const corsUrl = "https://cors-anywhere.herokuapp.com/";

export const getFeedListing = (url) => axios.get(`${corsUrl}${url}`);