import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppErrors";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = <string>request.headers.authentication;

  if (!authHeader) {
    throw new AppError("Token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "576057278c5a9d5629928f4d44471783");

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(<string>user_id);

    if (!user) {
      throw new AppError("User does not exists");
    }
    next();
  } catch (e) {
    throw new AppError("Invalid token.");
  }
}
