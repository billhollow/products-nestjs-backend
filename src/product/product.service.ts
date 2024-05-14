import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>, ){}

    createProduct(productDto: CreateProductDto): Promise <Product> {
        const newProduct = this.productRepository.create(productDto);   
        return this.productRepository.save(newProduct);
    }

    findAllProduct(): Promise<Product []> {
        return this.productRepository.find({order: {id: 'ASC'}});
    }

    viewProduct(id: number): Promise<Product> {
        return this.productRepository.findOneBy({id});
    }

    async updateProduct(id: number, productDto: Partial<CreateProductDto>): Promise<Product> {
        const foundProduct = await this.productRepository.findOneBy({id});
        if (!foundProduct) throw new NotFoundException('Product not found with sent id');
        Object.assign(foundProduct, productDto);
        return this.productRepository.save(foundProduct);
    }

    removeProduct(id: number): Promise<{affected?: number}> {
        return this.productRepository.delete(id);
    }
}
