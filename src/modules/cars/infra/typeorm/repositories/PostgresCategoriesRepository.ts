import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

export class PostgresCategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      name,
    });
    return category;
  }
}
