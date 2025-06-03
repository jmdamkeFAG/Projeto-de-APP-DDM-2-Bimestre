import { getApiUrl } from '../../constants/api';

export interface Aluno {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dataNasc: string;
  curso: string;
}

export async function getAlunos(): Promise<Aluno[]> {
  const API_URL = await getApiUrl();
  const response = await fetch(`${API_URL}/alunos`);
  if (!response.ok) throw new Error('Erro ao buscar alunos');
  return response.json();
}

export async function getAlunoById(id: string): Promise<Aluno> {
  const API_URL = await getApiUrl();
  const response = await fetch(`${API_URL}/alunos/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar aluno');
  return response.json();
}

export async function createAluno(aluno: Omit<Aluno, 'id'>): Promise<Aluno> {
  const API_URL = await getApiUrl();
  const response = await fetch(`${API_URL}/alunos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno),
  });
  if (!response.ok) throw new Error('Erro ao criar aluno');
  return response.json();
}

export async function deleteAluno(id: string): Promise<void> {
  const API_URL = await getApiUrl();
  const response = await fetch(`${API_URL}/alunos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao remover aluno');
  }
}

export async function updateAluno(id: string, aluno: Omit<Aluno, 'id'>): Promise<Aluno> {
  const API_URL = await getApiUrl();
  const response = await fetch(`${API_URL}/alunos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar aluno');
  }
  return response.json();
}

