import {Controller, Post, Body, HttpStatus, HttpCode} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './login.dto/login.dto';
import { RegisterDto } from './register.dto/register.dto';
import { ResponseDto } from './response.dto/response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<ResponseDto> {
    const user = await this.usersService.create(registerDto);
    const data = user.data;
    return {
      success: true,
      data: data,
      message: 'User created successfully',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    loginDto: LoginDto,
  ): Promise<ResponseDto> {
    const user = await this.usersService.findByEmailAndPassword(loginDto);
    const data = user.data;
    return {
      success: true,
      data: data,
      message: 'Login successful',
    };
  }
}
