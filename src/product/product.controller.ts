import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
@UsePipes(new ValidationPipe())
@UseGuards(JwtAuthGuard)
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    create(@Body() productDto: CreateProductDto) {
        return this.productService.createProduct(productDto);
    }

    @Get()
    findAll(){
        return this.productService.findAllProduct();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.viewProduct(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() productDto: UpdateProductDto) {
        return this.productService.updateProduct(+id, productDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.removeProduct(+id);
    }
}
