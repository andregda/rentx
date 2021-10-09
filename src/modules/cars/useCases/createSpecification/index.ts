import { SpecificationsRepository } from "../../repositories/Implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export default (): CreateSpecificationController => {
  const specificationRepository = new SpecificationsRepository();

  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationRepository
  );

  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
  );

  return createSpecificationController;
};
