import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignupResDto {
  @ApiProperty()
  @Expose()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
