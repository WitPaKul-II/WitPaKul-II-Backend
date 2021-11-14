import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshGuard extends AuthGuard('refresh') {
    getRequest(context: ExecutionContext): any {
        const request = context.switchToHttp().getRequest();
        return request;
      }
}