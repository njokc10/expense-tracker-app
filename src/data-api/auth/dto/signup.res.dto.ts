import { ApiProperty } from '@nestjs/swagger';

export class SignupResDto {
  @ApiProperty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
