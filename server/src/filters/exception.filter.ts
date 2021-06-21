import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import {} from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DuplicateRollExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.message.startsWith('Duplicate entry')
      ? HttpStatus.CONFLICT
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: ['duplicate roll'],
    });
  }
}
