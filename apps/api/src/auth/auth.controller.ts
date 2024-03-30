import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodApiBody, ZodApiResponse, ZodValidationPipe } from '../common';
import { SignupRequest, SignupResponse } from './dtos/signup.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ZodApiBody({ schema: SignupRequest })
  @ZodApiResponse({ status: HttpStatus.OK, schema: SignupResponse })
  async signup(
    @Body(new ZodValidationPipe(SignupRequest)) data: SignupRequest,
  ): Promise<SignupResponse> {
    return this.authService.signup(data);
  }
}
