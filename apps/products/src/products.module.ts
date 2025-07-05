import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PRODUCTS_DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../../../proto/auth.proto'),
          url: `localhost:${process.env.PORT}`,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
