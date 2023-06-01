import { Controller, Delete, Get, Patch, Post, Param } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories() {}

  @Auth('manager')
  @Post()
  createCategory() {}

  @Auth('manager')
  @Patch()
  updateCategory() {}

  @Auth('manager')
  @Delete(':id')
  deleteCategory(@Param('id') categoryId: string) {}

  @Get(':id')
  getCategoryWithProducts(@Param('id') categoryId: string) {
    return this.categoryService.getCategoryWithProducts(categoryId);
  }
}
