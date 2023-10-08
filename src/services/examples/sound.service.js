const { default: BaseService } = require("../base.service");

class SoundService extends BaseService {
  updateSound = async (id, body) => {
    const result = await this.api.post("/soundtrack/update/" + id, body);
    return result;
  };
}

export default SoundService;
