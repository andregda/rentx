import { Request, Response } from "express";

import { categoriesRepository } from "../createCategory";

class ListCategoriesController {
  handle(request: Request, response: Response): Response {
    const all = categoriesRepository.list();

    return response.json(all);
  }
}

export { ListCategoriesController };