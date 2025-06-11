import { CreateSession } from "../schemas/create-session.schema";
import { AuthenticationError, NotFoundError } from "../utils/errors";
import authService from "./auth.service";
import userService from "./user.service";

class SessionService {
  async create(data: CreateSession) {
    const user = await userService.getByEmail(data.email);
    if(!user)
      throw new NotFoundError()

    const isValidPassword = await authService.comparePassword(data.password, user.passwordHash)

    if(!isValidPassword)
      throw new AuthenticationError(`Invalid password.`)

    return authService.generateToken(user.id.toString());
  }
}

export default new SessionService();