import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoModule } from './aluno/aluno.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [AlunoModule],
  providers: [PrismaService],
})
export class AppModule {}
