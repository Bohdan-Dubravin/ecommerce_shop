// import { UseGuards, applyDecorators } from '@nestjs/common';
// import { TypeRole } from './auth.type';

// import { AdminGuard } from '../guards/admin.guard';
// import { MangerGuard } from '../guards/manager.guard';
// import { AtGuard } from '../guards';

// export const Auth = (role: TypeRole = 'user') =>
//   applyDecorators(
//     role === 'admin'
//       ? UseGuards(AtGuard, AdminGuard)
//       : role === 'manager'
//       ? UseGuards(AtGuard, MangerGuard)
//       : UseGuards(AtGuard),
//   );
