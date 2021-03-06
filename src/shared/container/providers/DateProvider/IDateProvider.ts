interface IDateProvider {
  dateNow(): Date;
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(days: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
