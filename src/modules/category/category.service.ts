import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/Category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const existCategory = await this.categoryRepository.findOneBy({
      title: dto.title,
    });

    if (existCategory) {
      throw new ForbiddenException('Category already exist');
    }

    const newCategory = this.categoryRepository.create({
      ...dto,
    });

    return this.categoryRepository.save(newCategory);
  }

  async getAllCategories() {
    const categories = await this.categoryRepository.find();

    if (!categories) {
      throw new NotFoundException('Categories have not been created');
    }

    return categories;
  }

  async updateCategory(categoryId: string, dto: CreateCategoryDto) {
    const updatedCategory = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.save({ ...updatedCategory, ...dto });
  }

  async getCategoryWithProducts(categoryId: string) {
    const categoryProducts = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: { products: true },
    });

    if (!categoryProducts) {
      throw new NotFoundException("Category don't have products");
    }

    return categoryProducts;
  }
}
