const { default: BaseService } = require("../base.service");

class SeasonService extends BaseService {
  updateSeason = async (id, body) => {
    const result = await this.api.post("/season/update/" + id, body);
    return result;
  };

  addSeason = async (body) => {
    const result = await this.api.post("/season/add", body);
    return result;
  };

  deleteSeason = async (id) => {
    const result = await this.api.post("/season/delete/" + id);
    return result;
  };
}

export default SeasonService;
