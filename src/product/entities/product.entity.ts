import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 50 })
  sku: string;
  
  @Column({ type: 'decimal', scale: 2 })
  grams: number;

  @Column({ type: 'int', nullable: true})
  stock: number;

  @Column({ type: 'int'})
  price: number;

  @Column({ type: 'int', nullable: true})
  comparePrice: number;

  @Column({ length: 50 })
  barcode: string;
}