import { AlunoService } from './aluno.service';
import { CreateAlunoDTO } from './dto/createAlunoDto';
import { UpdateAlunoDTO } from './dto/updateAlunoDto';
export declare class AlunoController {
    private readonly alunoService;
    constructor(alunoService: AlunoService);
    findAll(): Promise<{
        nome: string;
        cpf: string;
        email: string;
        dataNasc: Date | null;
        curso: string;
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        nome: string;
        cpf: string;
        email: string;
        dataNasc: Date | null;
        curso: string;
        id: string;
    } | null>;
    create(createAlunoDTO: CreateAlunoDTO): Promise<{
        nome: string;
        cpf: string;
        email: string;
        dataNasc: Date | null;
        curso: string;
        id: string;
    }>;
    update(id: string, updateAlunoDTO: UpdateAlunoDTO): Promise<{
        nome: string;
        cpf: string;
        email: string;
        dataNasc: Date | null;
        curso: string;
        id: string;
    }>;
    delete(id: string): Promise<{
        nome: string;
        cpf: string;
        email: string;
        dataNasc: Date | null;
        curso: string;
        id: string;
    }>;
}
