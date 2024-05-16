import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { DuplicateKeyViolationFilter } from './shared/exceptions/query-failed-error';
import { APP_FILTER } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    ProductModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASS,
      username: process.env.DB_USER,
      entities: [User, Product],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    MulterModule.register({
      dest: './excel-file-uploads', // Destination folder for storing uploaded files
      limits: {
        fileSize: 1024 * 1024 * 5, // Maximum file size (in bytes), here set to 5MB
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyViolationFilter,
    }
  ],
})
export class AppModule {}
