import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to Create a new Car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Test",
      description: "Car Description Test",
      daily_rate: 200,
      license_plate: "XXX-0000",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "Category Car",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to Create a Car with existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car Test",
        description: "Car Description Test",
        daily_rate: 200,
        license_plate: "XXX-0000",
        fine_amount: 40,
        brand: "Car Brand",
        category_id: "Car Category",
      });

      await createCarUseCase.execute({
        name: "Car2 Test",
        description: "Car2 Description Test",
        daily_rate: 300,
        license_plate: "XXX-0000",
        fine_amount: 60,
        brand: "Car2 Brand",
        category_id: "Car2 Category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to Create a Car as available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Car Description Available",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "Car Available Category",
    });

    expect(car.available).toBe(true);
  });
});
