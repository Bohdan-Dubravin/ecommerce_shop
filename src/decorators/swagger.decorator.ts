import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

export default function SwaggerDoc(
  status: number,
  summary: string,
  bodyType?: any,
  responseType?: any,
) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: bodyType || { data: 'no data' } }),
    ApiResponse({ status, type: responseType || { data: 'no data' } }),
  );
}
