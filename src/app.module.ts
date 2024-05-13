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

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'root',
      username: 'postgres',
      entities: [User],
      database: 'products-nestjs',
      synchronize: true,
      logging: true,
    }), ProductModule,
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
