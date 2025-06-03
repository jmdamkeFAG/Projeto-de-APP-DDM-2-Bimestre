import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDTO } from './dto/createAlunoDto';
import { UpdateAlunoDTO } from './dto/updateAlunoDto';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(id);
  }

  @Post()
  async create(@Body() createAlunoDTO: CreateAlunoDTO) {
    return this.alunoService.create(createAlunoDTO);
  }

  @Patch(':id')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAlunoDTO: UpdateAlunoDTO ) {
    return this.alunoService.update(id, updateAlunoDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.alunoService.delete(id);
  }
}