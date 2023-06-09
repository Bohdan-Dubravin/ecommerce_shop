import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/Category';
import { Repository } from 'typeorm';
import { Product } from '../../entities/Product';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private productRepository: Repository<Product>,
    @InjectRepository(Product)
    private categoryRepository: Repository<Category>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const existProduct = await this.productRepository.findOneBy({
      title: dto.title,
    });

    if (existProduct) {
      throw new ForbiddenException('Category already exist');
    }

    const newCategory = this.productRepository.create({
      ...dto,
    });

    return this.productRepository.save(newCategory);
  }

  async getAllProducts() {
    const products = await this.productRepository.find({
      relations: { variants: true },
    });

    if (!products.length) {
      throw new NotFoundException('Categories have not been created');
    }

    return products;
  }

  async updateProduct(categoryId: string, dto) {
    const updatedProduct = await this.productRepository.findOneBy({
      id: categoryId,
    });

    if (!updatedProduct) {
      throw new NotFoundException('Category not found');
    }

    return this.productRepository.save({ ...updatedProduct, ...dto });
  }
}
