import { prisma } from "../../db";
import Hash from "../utils/bcrypt";
import JWT from "../utils/jwt";
import * as trpc from "@trpc/server";

enum SuccessMessages {
  CREATE = "Usuário criado com sucesso",
}

enum ErrorMessages {
  INVALID_NAME = "Nome inválido",
  INVALID_EMAIL = "Email inválido",
  INVALID_PASSWORD = "Senha inválida",
  EMAIL_ALREADY_EXISTS = "Email já cadastrado",
}

type UserType = {
  name: string;
  email: string;
  password: string;
};

export class SingUpService {
  public static async execute(input: UserType) {
    try {
      this.validateData(input);

      const existUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existUser) {
        throw new Error(ErrorMessages.EMAIL_ALREADY_EXISTS);
      }

      const hashPassword = await Hash.generateHash(input.password);

      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashPassword,
        },
      });
      const token = JWT.generateToken(user.id);
      return {
        user,
        token,
        message: SuccessMessages.CREATE,
      };
    } catch (error: any) {
      throw new trpc.TRPCError({
        code: "BAD_REQUEST",
        message: error.message,
      });
    }
  }
  private static validateData(input: UserType) {
    const { name, email, password } = input;
    if (name.length < 3) {
      throw new Error(ErrorMessages.INVALID_NAME);
    }
    if (!email.includes("@")) {
      throw new Error(ErrorMessages.INVALID_EMAIL);
    }
    if (password.length < 6) {
      throw new Error(ErrorMessages.INVALID_PASSWORD);
    }
  }
}
