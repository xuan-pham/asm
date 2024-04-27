import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';

export const ValidateUuid = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.params[data];

    if (!isUuid(value)) {
      throw new BadRequestException(`${data} is not a valid UUID.`);
    }

    return value;
  },
);
