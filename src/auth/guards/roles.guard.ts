import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../users/entities/user.entity';
import { ClientRole } from '../enums/role.enum';
import { ROLES_METADATA_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private refector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredClientRoles = this.refector.getAllAndOverride<
      ClientRole[] | undefined
    >(ROLES_METADATA_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredClientRoles || requiredClientRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user: Partial<User> = req.user;

    return (user.roles ?? []).some((role) =>
      requiredClientRoles.includes(role.name),
    );
  }
}
