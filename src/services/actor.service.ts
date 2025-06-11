import { Transaction } from "sequelize";
import { Actor } from "../models";

class ActorService {
  async createMany (actorNames: string[], transaction?: Transaction) {
    const actorData = actorNames.map(name => ({name}))
    return Actor.bulkCreate(actorData, {transaction})
  }
}

export default new ActorService();