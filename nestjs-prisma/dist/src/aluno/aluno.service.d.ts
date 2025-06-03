import { PrismaService } from 'prisma/prisma.service';
import { Aluno } from '@prisma/client';
import { CreateAlunoDTO } from './dto/createAlunoDto';
import { UpdateAlunoDTO } from './dto/updateAlunoDto';
export declare class AlunoService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapToEntity;
    findAll(): Promise<Aluno[]>;
    create(createAlunoDTO: CreateAlunoDTO): Promise<Aluno>;
    findOne(id: string): Promise<Aluno | null>;
    update(id: string, updateAlunoDto: UpdateAlunoDTO): Promise<Aluno>;
    delete(id: string): Promise<Aluno>;
}
