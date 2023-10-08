const { default: BaseService } = require("../base.service");

class FilmService extends BaseService {
  getList = async (page) => {
    const result = await this.api.get("/films?page=" + page);
    return result;
  };

  getById = async (_id) => {
    const result = await this.api.get("/films/id?id=" + _id);
    return result;
  };

  getSoundTrack = async (film, episodeSlug) => {
    const result = await this.api.get(`/soundtrack?film=${film}` );
    return result;
  }
}

export default FilmService;
