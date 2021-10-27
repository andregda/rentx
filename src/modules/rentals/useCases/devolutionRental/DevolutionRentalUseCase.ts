import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const mininumDailyRental = 1;

    if (!rental) {
      throw new AppError("Rental does not exist!");
    }

    const dateNow = this.dateProvider.dateNow();

    let dailyRentals = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (dailyRentals <= 0) {
      dailyRentals = mininumDailyRental;
    }

    const overdueDays = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let totalAmount = 0;

    if (overdueDays > 0) {
      const fineAmount = overdueDays * car.fine_amount;
      totalAmount = fineAmount;
    }

    totalAmount += dailyRentals * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalAmount;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
