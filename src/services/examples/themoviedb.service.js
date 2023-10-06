const { default: BaseService } = require("../base.service");

class TheMovieDBServer extends BaseService {
  getThemovieDB = async (id, typeFilm = "movie") => {
    const result = await this.api.getThemovieDB(
      `/${typeFilm}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return result;
  };
}

export default TheMovieDBServer;

