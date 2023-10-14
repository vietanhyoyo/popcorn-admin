const { default: BaseService } = require("../base.service");

class SoundService extends BaseService {
  updateSound = async (id, body) => {
    const result = await this.api.post("/soundtrack/update/" + id, body);
    return result;
  };

  addSound = async (body) => {
    const result = await this.api.post("/soundtrack/add", body);
    return result;
  };

  deleteSound = async (id) => {
    const result = await this.api.post("/soundtrack/delete/" + id);
    return result;
  };
}

export default SoundService;
