import { User } from "../models";
import { CreateUser } from "../schemas/create-user.schema";
import bcrypt from "bcrypt"
import { ConflictError, NotFoundError } from "../utils/errors";

class UserService {
  async create (data: CreateUser) {
    const user = await this.getByEmail(data.email)
    if(user)
      throw new ConflictError()

    const passwordHash = await bcrypt.hash(data.password, 10)
    return await User.create({...data, passwordHash})
  }

  async getByEmail (email: string) {
    return await User.findOne({
      where: {
        email
      }
    })
  }
}

export default new UserService();