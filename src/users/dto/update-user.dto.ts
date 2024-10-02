import { PartialType } from '@nestjs/mapped-types';
import { AccountStatus } from '../enums/user.enums';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  accountStatus?: AccountStatus;
}
