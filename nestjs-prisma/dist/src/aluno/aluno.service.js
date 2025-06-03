"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AlunoService = class AlunoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapToEntity(aluno) {
        return {
            id: aluno.id,
            cpf: aluno.cpf,
            nome: aluno.nome,
            email: aluno.email,
            dataNasc: aluno.dataNasc,
            curso: aluno.curso,
        };
    }
    async findAll() {
        const aluno = await this.prisma.aluno.findMany();
        return aluno.map(aluno => this.mapToEntity(aluno));
    }
    async create(createAlunoDTO) {
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
    async findOne(id) {
        const aluno = await this.prisma.aluno.findUnique({ where: { id } });
        return this.mapToEntity(aluno);
    }
    async update(id, updateAlunoDto) {
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
    async delete(id) {
        return this.prisma.aluno.delete({ where: { id } });
    }
};
exports.AlunoService = AlunoService;
exports.AlunoService = AlunoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlunoService);
//# sourceMappingURL=aluno.service.js.map