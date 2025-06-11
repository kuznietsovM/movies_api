import { CreateSession } from "../schemas/create-session.schema";
import { AuthenticationError } from "../utils/errors";
import authService from "./auth.service";
import userService from "./user.service";

class SessionService {
  async create(data: CreateSession) {
    const user = await userService.getByEmail(data.email);
    if(!user)
      throw new AuthenticationError(`Wrong login or password`, ['email', 'password'])

    const isValidPassword = await authService.comparePassword(data.password, user.passwordHash)

    if(!isValidPassword)
      throw new AuthenticationError(`Wrong login or password`, ['email', 'password'])

    return authService.generateToken(user.id.toString());
  }
}

export default new SessionService();