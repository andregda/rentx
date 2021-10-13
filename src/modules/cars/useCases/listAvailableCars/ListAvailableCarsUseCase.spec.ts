import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
});

describe("List Cars", () => {
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test find availables",
      description: "Car Test find availables",
      daily_rate: 100,
      license_plate: "AVA-1111",
      fine_amount: 50,
      brand: "Car Brand find available",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars by brand and name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test find availables by brand",
      description: "Car Test find availables",
      daily_rate: 100,
      license_plate: "AVA-1111",
      fine_amount: 50,
      brand: "Car Brand find available by brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car Brand find available by brand",
      name: "Car Test find availables by brand",
    });
    expect(cars).toEqual([car]);
  });
});
