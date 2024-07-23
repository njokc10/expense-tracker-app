import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { match, P } from 'ts-pattern';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateAccessTokenUseCase } from '~domain/auth/use-cases/create-access-token.use-case';
import { CreateUserUseCase } from '~domain/user/use-cases/create-user.use-case';
import { LoginUseCase } from '~domain/auth/use-cases/login.use-case';
import { SignupBodyDto } from './dto/signup.body.dto';
import { LoginBodyDto } from './dto/login.body.dto';
import { SignupResDto } from './dto/signup.res.dto';
import { LoginResDto } from './dto/login.res.dto';
import { API_V1_PATH } from '~common/http/http.constant';
import {
  UserNotFoundAuthError,
  WrongPasswordAuthError,
} from '~domain/auth/auth.error';
import { EmailInUseUserError } from '~domain/user/user.error';

@Controller(`${API_V1_PATH}/auth`)
export class AuthController {
  constructor(
    private createAccessTokenUseCase: CreateAccessTokenUseCase,
    private createUserUseCase: CreateUserUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  @ApiOkResponse({ type: SignupResDto })
  @Post('signup')
  async signup(@Body() data: SignupBodyDto): Promise<SignupResDto> {
    const result = await this.createUserUseCase.execute(data);

    return result
      .mapErr((error): void => {
        match(error)
          .with(P.instanceOf(EmailInUseUserError), (error) => {
            throw new ConflictException(error, {
              cause: error,
            });
          })
          .exhaustive();
      })
      .map((user): SignupResDto => {
        const acccessToken = this.createAccessTokenUseCase.execute(user);
        return new SignupResDto(acccessToken);
      })
      .unwrap();
  }

  @HttpCode(200)
  @ApiOkResponse({ type: LoginResDto })
  @Post('login')
  async login(@Body() data: LoginBodyDto): Promise<LoginResDto> {
    const result = await this.loginUseCase.execute(data);

    return result
      .mapErr((error): void => {
        match(error)
          .with(P.instanceOf(WrongPasswordAuthError), (error) => {
            throw new ForbiddenException(error, {
              cause: error,
            });
          })
          .with(P.instanceOf(UserNotFoundAuthError), (error) => {
            throw new NotFoundException(error, {
              cause: error,
            });
          })
          .exhaustive();
      })
      .map((accessToken): LoginResDto => {
        return new LoginResDto(accessToken);
      })
      .unwrap();
  }
}
