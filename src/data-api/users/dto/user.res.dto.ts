import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '~domain/user/user.entity';

export class UserResDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  constructor(data: UserEntity) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
