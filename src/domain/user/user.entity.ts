import { BaseEntity, trackChanges } from '~common/entity/base.entity';
import { IUser } from './interfaces/user.interface';
import { Expose } from 'class-transformer';
import { randomUUID } from 'crypto';
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export type NewUser = Pick<
  IUser,
  'firstName' | 'lastName' | 'phoneNumber' | 'email' | 'password'
>;
export type UpdateUser = Omit<Partial<NewUser>, 'password'>;

export class UserEntity extends BaseEntity<IUser> implements IUser {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @IsOptional()
  @IsPhoneNumber('US')
  @Expose()
  phoneNumber: string;

  @IsEmail()
  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  private constructor(data: IUser) {
    super();
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phoneNumber = data.phoneNumber;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static new(data: NewUser) {
    return new UserEntity({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    });
  }

  static toDomain(data: IUser) {
    return trackChanges<UserEntity>(new UserEntity(data));
  }
}
