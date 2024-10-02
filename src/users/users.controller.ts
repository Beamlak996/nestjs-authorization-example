import { Controller, Get, Query } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FindUsersDto } from './dto/find-users.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { ClientRole } from '../auth/enums/role.enum';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { ClientPermission } from '../auth/enums/permission.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(ClientRole.Admin, ClientRole.Editor)
  @Permissions(ClientPermission.CreateAnnouncement)
  findMany(@Query() query: FindUsersDto) {
    return this.usersService.findMany(query);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
