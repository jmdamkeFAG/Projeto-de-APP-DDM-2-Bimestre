import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [AlunoService, PrismaService],
  controllers: [AlunoController],
  exports: [AlunoService]
})
export class AlunoModule {}
