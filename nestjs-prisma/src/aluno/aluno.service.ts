import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Aluno } from '@prisma/client';
import { CreateAlunoDTO } from './dto/createAlunoDto';
import { UpdateAlunoDTO } from './dto/updateAlunoDto';


@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) { }

  private mapToEntity(aluno: any): Aluno {
    return {
      id: aluno.id,
      cpf: aluno.cpf,
      nome: aluno.nome,
      email: aluno.email,
      dataNasc: aluno.dataNasc,
      curso: aluno.curso,
    }
  }

  async findAll(): Promise<Aluno[]> {
    const aluno =
      await this.prisma.aluno.findMany();
    return aluno.map(aluno => this.mapToEntity(aluno));
  }

  async create(createAlunoDTO: CreateAlunoDTO): Promise<Aluno> {
    const aluno = await this.prisma.aluno.create({
      data: {
        nome: createAlunoDTO.nome,
        cpf: createAlunoDTO.cpf,
        email: createAlunoDTO.email,
        dataNasc: new Date(createAlunoDTO.dataNasc),
        curso: createAlunoDTO.curso,
      }
    });
    return this.mapToEntity(aluno);
  }


  async findOne(id: string): Promise<Aluno | null> {
    const aluno =
      await this.prisma.aluno.findUnique({ where: { id } });
    return this.mapToEntity(aluno);
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDTO): Promise<Aluno> {

    const alunoAtualizado = await this.prisma.aluno.update({
      where: { id },
      data: {
        nome: updateAlunoDto.nome,
        cpf: updateAlunoDto.cpf,
        email: updateAlunoDto.email,
        dataNasc: new Date(updateAlunoDto.dataNasc),
        curso: updateAlunoDto.curso,
      }
    });

    return this.mapToEntity(alunoAtualizado);
  }

  /*async update(id: string, updateAlunoDto: UpdateAlunoDTO): Promise<Aluno> {
    const aluno = await this.prisma.aluno.update({ where: { id }, data: updateAlunoDto})
    return this.mapToEntity(aluno);
  }*/

  async delete(id: string): Promise<Aluno> {
    return this.prisma.aluno.delete({ where: { id } });
  }
}