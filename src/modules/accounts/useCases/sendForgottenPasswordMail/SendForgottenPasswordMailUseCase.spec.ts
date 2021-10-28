import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory,";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgottenPasswordMailUseCase } from "./SendForgottenPasswordMailUseCase";

let sendForgottenPasswordMailUseCase: SendForgottenPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: IMailProvider;

describe("Send Forgotten Password via Mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgotten-password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "91c23b",
      email: "test@test.com",
      name: "test",
      password: "1234",
    });

    await sendForgottenPasswordMailUseCase.execute("test@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a mail if user does not exists", async () => {
    await expect(
      sendForgottenPasswordMailUseCase.execute("rand@email.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create a token", async () => {
    const generateTokenMail = spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      driver_license: "91c23b",
      email: "test@test.com",
      name: "test",
      password: "1234",
    });

    await sendForgottenPasswordMailUseCase.execute("test@test.com");

    expect(generateTokenMail).toBeCalled();
  });
});
