import { Router } from "express";
import { container } from "tsyringe";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = container.resolve(
  CreateSpecificationController
);

specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
