import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

import { ErrorUtil } from '../utils/error.util';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const status = 404;

    res.status(status).json({ error: ErrorUtil.entityNotFound() });
  }
}
