import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userTokens: UserToken[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokensDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((token) => token.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (token) => token.refresh_token === refresh_token
    );
    return userToken;
  }
}

export { UserTokensRepositoryInMemory };
