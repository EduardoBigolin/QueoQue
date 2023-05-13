import "dotenv/config";
import jwt from "jsonwebtoken";

export default class JWT {
  public static generateToken(id: string) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  public static verifyToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  }
}
