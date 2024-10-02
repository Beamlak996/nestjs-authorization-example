import { SetMetadata } from "@nestjs/common";
import { ClientRole } from "../enums/role.enum";

export const ROLES_METADATA_KEY = 'roles_decorator_key'

export const Roles = (...roles: ClientRole[]) =>
  SetMetadata(ROLES_METADATA_KEY, roles);