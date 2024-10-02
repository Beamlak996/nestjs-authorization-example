import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../users/entities/user.entity';
import { ClientPermission } from '../enums/permission.enum';
import { PERMISSION_METADATA_KEY } from '../decorators/permissions.decorator';
import { getClientPermissions } from '../helpers/auth.helper';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private refector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredClientPermissions = this.refector.getAllAndOverride<
      ClientPermission[] | undefined
    >(PERMISSION_METADATA_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredClientPermissions || requiredClientPermissions.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const userPermissions = getClientPermissions(req.user)

    return requiredClientPermissions.some(permission => userPermissions.has(permission))
  }
}
