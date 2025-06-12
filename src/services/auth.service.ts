import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import config from '../config/config';

const secret = config.jwtSecret;

class AuthService {
  generateToken (userId: string) {
    return jwt.sign({userId}, secret, {
      expiresIn: config.jwtExpireTimeSeconds
    })
  }

  verifyToken (token: string) {
    return jwt.verify(token, secret)
  }

  async comparePassword (password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}

export default new AuthService();