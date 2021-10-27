import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPassword/ResetPasswordUserController";
import { SendForgottenPasswordMailController } from "@modules/accounts/useCases/sendForgottenPasswordMail/SendForgottenPasswordMailController";

const passwordRoutes = Router();

const sendForgottenPasswordMailController =
  new SendForgottenPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgotten", sendForgottenPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
