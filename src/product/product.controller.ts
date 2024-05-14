import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { BulkloadProductExcelService } from './bulkload/excel-to-objects';

@Controller('product')
@UsePipes(new ValidationPipe())
@UseGuards(JwtAuthGuard)
export class ProductController {

    constructor(
        private readonly productService: ProductService, 
        private readonly bulkloadProductExcelService: BulkloadProductExcelService,
    ){}

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

    @Post('bulkload')
    @UseInterceptors(FileInterceptor('file'))
    async bulkload(@UploadedFile() file: Express.Multer.File) {
        const products = await this.bulkloadProductExcelService.convertExcelToProducts(file);
        await this.bulkloadProductExcelService.createProductsMultipleProductDto(products);
        return {"created_products": products.length};
    }
}
