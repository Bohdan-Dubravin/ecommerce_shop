import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCurrentUser } from '../../auth/decorators';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
  @Auth('manager')
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Auth('manager')
  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Auth('manager')
  @Delete(':id')
  deleteCategory(@Param('id') categoryId: string) {}

  @Get(':id')
  getCategoryWithProducts(@Param('id') categoryId: string) {
    return this.categoryService.getCategoryWithProducts(categoryId);
  }
}
