import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/Category';
import { Repository } from 'typeorm';
import { Product } from '../../entities/Product';
import { CreateProductDto } from './dto/createCategory.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const existProduct = await this.categoryRepository.findOneBy({
      title: dto.title,
    });

    if (existProduct) {
      throw new ForbiddenException('Category already exist');
    }

    const newCategory = this.categoryRepository.create({
      ...dto,
    });

    return this.categoryRepository.save(newCategory);
  }

  async getAllProducts() {
    const products = await this.categoryRepository.find();

    if (!products.length) {
      throw new NotFoundException('Categories have not been created');
    }

    return products;
  }

  async updateProduct(categoryId: string, dto) {
    const updatedProduct = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!updatedProduct) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.save({ ...updatedProduct, ...dto });
  }
}
