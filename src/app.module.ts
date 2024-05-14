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

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'root',
      username: 'postgres',
      entities: [User, Product],
      database: 'products-nestjs',
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
