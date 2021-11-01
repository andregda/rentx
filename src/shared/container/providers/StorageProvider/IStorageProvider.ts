interface IStorageProvider {
  save(file: string): Promise<string>;
  delte(file: string): Promise<void>;
}

export { IStorageProvider };
