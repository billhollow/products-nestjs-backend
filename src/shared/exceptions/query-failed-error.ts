import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DuplicateKeyViolationFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let errorMessage = exception.message

    // Check if return detailt because of Postgresql
    if (exception.hasOwnProperty('detail')) {
        errorMessage = exception.detail;
      } 

    // Customize the error response
    response.status(400).json({
      statusCode: 400,
      message: errorMessage,
      error: 'Query failed', // You can customize this further if needed
    });
  }
}
