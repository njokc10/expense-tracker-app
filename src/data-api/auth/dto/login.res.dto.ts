import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
