import { BadRequestException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { CreateProductDto } from '../dtos/product.dto';
import { validate } from 'class-validator';
import { ProductService } from '../product.service';


@Injectable()
export class BulkloadProductExcelService {
    
    constructor(
        private readonly productService: ProductService,
    ){}

    async convertExcelToProducts (file: Express.Multer.File): Promise<CreateProductDto[]>{
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const validationErrors = [];
        const products = [];
        let tmpErrors;

        // Extract rows
        const rows = data.slice(1); // Exclude the header row

        for (let i=0; i<rows.length; i++){
            
            const productDto = new CreateProductDto();

            productDto.handle = rows[i][0]
            productDto.title = rows[i][1]
            productDto.description = rows[i][2]
            productDto.sku = `${rows[i][3]}`
            productDto.grams = parseFloat(rows[i][4])
            productDto.stock = rows[i][5]
            productDto.price = rows[i][6]
            productDto.comparePrice = rows[i][7]
            productDto.barcode = `${rows[i][8]}`
            
            if (!productDto.handle) break;

            tmpErrors = await validate(productDto);
            if (tmpErrors.length > 0) {
                console.log(productDto)
                console.log(i);
                validationErrors.push(tmpErrors.toString());
                break;
            }
            products.push(productDto);
        }
        
        if (validationErrors.length > 0) throw new BadRequestException(validationErrors.join('\n '));
        
        return products;
    }

    async createProductsMultipleProductDto(products: CreateProductDto []) {
        for (let i=0; i<products.length; i++) {
            await this.productService.createProduct(products[i]);
        }
    }
}