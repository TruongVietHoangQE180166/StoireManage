import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const data = await this.productService.create(createProductDto);
      return {
        method: 'CREATE',
        data,
      };
    } catch (error) {
      throw new BadRequestException({
        method: 'CREATE',
        error: {
          status: 400,
          message: error.message,
        },
      });
    }
  }

  @Get('list')
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      if (!page || !limit) {
        throw new Error('Page and limit are required');
      }
      const result = await this.productService.findAll(+page, +limit);
      return {
        method: 'GET_ALL',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException({
        method: 'GET_ALL',
        error: {
          status: 400,
          message: error.message,
        },
      });
    }
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.productService.findOne(+id);
      return {
        method: 'GET_ONE',
        data,
      };
    } catch (error) {
      throw new BadRequestException({
        method: 'GET_ONE',
        error: {
          status: 400,
          message: error.message,
        },
      });
    }
  }

  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const data = await this.productService.update(+id, updateProductDto);
      return {
        method: 'UPDATE',
        data,
      };
    } catch (error) {
      throw new BadRequestException({
        method: 'UPDATE',
        error: {
          status: 400,
          message: error.message,
        },
      });
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.productService.remove(+id);
      return {
        method: 'DELETE',
        data: { message: `Product with ID ${id} deleted successfully` },
      };
    } catch (error) {
      throw new BadRequestException({
        method: 'DELETE',
        error: {
          status: 400,
          message: error.message,
        },
      });
    }
  }
}
