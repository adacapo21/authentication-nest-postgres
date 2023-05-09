import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from './response.dto/response.dto';
import { RegisterDto } from './register.dto/register.dto';
import { LoginDto } from './login.dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(registerDto: RegisterDto): Promise<ResponseDto> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const user = await this.usersRepository.create({
      email: registerDto.email,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    return {
      success: true,
      data: savedUser,
    };
  }

  async findByEmailAndPassword(loginDto: LoginDto): Promise<ResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const passwordMatch = bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatch) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
