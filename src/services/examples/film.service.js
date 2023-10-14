const { default: BaseService } = require("../base.service");

class FilmService extends BaseService {
  getList = async (page, name, type) => {
    console.log(name, type);
    const result = await this.api.get(`/films?page=${page}&name=${name ?? ""}&type=${type ?? ""}`);
    return result;
  };

  getById = async (_id) => {
    const result = await this.api.get("/films/id?id=" + _id);
    return result;
  };

  getSoundTrack = async (film, episode) => {
    const result = await this.api.get(`/soundtrack?film=${film}&episode=${episode ?? ""}`);
    return result;
  };

  getSeasons = async (film) => {
    const result = await this.api.get(`/season?film=${film}`);
    return result;
  };

  getEpisodes = async (film, season) => {
    const result = await this.api.get(`/episode?film=${film}&season=${season}`);
    return result;
  };

  updateFilm = async (id, body) => {
    const result = await this.api.post("/films/update/" + id, body);
    return result;
  };

  addFilm = async (body) => {
    const result = await this.api.post("/films/add/", body);
    return result;
  };
}

export default FilmService;
