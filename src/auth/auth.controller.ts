import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      const newUser = await this.authService.register(createAuthDto);
      return {
        message: 'User registered successfully',
        data: newUser,
      };
    } catch (error) {
      throw new BadRequestException({
        status: 400,
        message: error.message,
      });
    }
  }
}
