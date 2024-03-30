import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common';
import { SignupRequest, SignupResponse } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(SignupRequest))
  async signup(@Body() data: SignupRequest): Promise<SignupResponse> {
    return this.authService.signup(data);
  }
}
