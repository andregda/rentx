import { Router } from "express";

import { SendForgottenPasswordMailController } from "@modules/accounts/useCases/sendForgottenPasswordMail/SendForgottenPasswordMailController";

const passwordRoutes = Router();

const sendForgottenPasswordMailController =
  new SendForgottenPasswordMailController();

passwordRoutes.post("/forgotten", sendForgottenPasswordMailController.handle);

export { passwordRoutes };
