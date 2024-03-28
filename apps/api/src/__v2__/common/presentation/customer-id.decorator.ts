import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomerID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.customerID;
  },
);
