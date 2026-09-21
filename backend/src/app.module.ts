import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VisitasModule } from './visitas/visitas.module';

@Module({
  imports: [PrismaModule, VisitasModule],
})
export class AppModule {}
