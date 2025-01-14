import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAccount } from './schemas/account.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAccount.name) private userAccountModel: Model<UserAccount>,
  ) {}

  async register(createDto: CreateAuthDto): Promise<Omit<UserAccount, 'password'>> {
    // Validate password match
    if (createDto.password !== createDto.repassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check existing email
    const existingEmail = await this.userAccountModel.findOne({
      email: createDto.email,
    });

    if (existingEmail) {
      throw new BadRequestException('User with this email already exists');
    }

    // Check existing ID
    const existingId = await this.userAccountModel.findOne({
      id: createDto.id,
    });

    if (existingId) {
      throw new BadRequestException('User with this ID already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    // Prepare user data (role is always 'customer')
    const userData = {
      ...createDto,
      password: hashedPassword,
      isActive:  true, 
      role: 'customer',  
    };
    delete userData.repassword; // Remove repassword before saving

    // Save new user
    const newUser = new this.userAccountModel(userData);
    const savedUser = await newUser.save();

    // Remove password from the response
    const response = savedUser.toObject();
    delete response.password;
    return response;
    
  }
}
