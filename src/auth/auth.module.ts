import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAccount, UserAccountSchema } from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: UserAccountSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    MongooseModule, // Export MongooseModule để các module khác có thể sử dụng UserAccountModel
  ],
})
export class AuthModule {}
