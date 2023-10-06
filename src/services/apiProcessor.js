import axios from "axios";

const HEADERS = {
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
};

class APIProcessor {
  post = async (path, data) => {
    try {
      const result = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + path,
        data,
        headers: {
          ...HEADERS,
        },
      });
      return result;
    } catch (err) {
      return err;
    }
  };

  get = async (path) => {
    try {
      const result = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + path,
        headers: {
          ...HEADERS,
        },
      });
      return result;
    } catch (err) {
      return err;
    }
  };

  getThemovieDB = async (path) => {
    console.log(process.env.REACT_APP_THE_MOVIE_DB + path);
    try {
      const result = await axios({
        method: "get",
        url: process.env.REACT_APP_THE_MOVIE_DB + path,
        headers: {
          ...HEADERS,
        },
      });
      return result;
    } catch (err) {
      return err;
    }
  };
}

export default APIProcessor;
