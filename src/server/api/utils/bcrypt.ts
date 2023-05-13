import bcrypt from "bcrypt";

export default class Hash {
  public static async generateHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public static async compareHash(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
