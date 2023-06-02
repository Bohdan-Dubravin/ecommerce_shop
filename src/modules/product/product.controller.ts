import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Auth('manager')
  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Auth('manager')
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Auth('manager')
  @Delete(':id')
  deleteCategory(@Param('id') categoryId: string) {}
}
