import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { Databaseconfig} from './config/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    Databaseconfig, 
    CustomerModule,
    ProductModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

