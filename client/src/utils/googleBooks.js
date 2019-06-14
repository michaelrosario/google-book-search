import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export default {
  // Use Google API to get results
  searchBook: function(title) {
    title = title.trim().replace(/\s/g, '+');
    return axios.get(`${API_URL}${title}&key=${API_KEY}`);
  }
};
