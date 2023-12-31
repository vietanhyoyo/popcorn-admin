const { default: BaseService } = require("../base.service");

class EpisodeService extends BaseService {
  updateEpisode = async (id, body) => {
    const result = await this.api.post("/episode/update/" + id, body);
    return result;
  };

  addEpisode = async (body) => {
    const result = await this.api.post("/episode/add", body);
    return result;
  };

  deleteEpisode = async (id) => {
    const result = await this.api.post("/episode/delete/" + id);
    return result;
  };
}

export default EpisodeService;
