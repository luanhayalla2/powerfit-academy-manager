// Tipos para o sistema de gerenciamento de alunos

export type Plan = 'mensal' | 'trimestral' | 'anual';

export type ClassType = 'musculacao' | 'spinning' | 'yoga' | 'crossfit' | 'danca' | 'funcional';

export interface Student {
  id: string;
  nome: string;
  email: string;
  idade: number;
  telefone: string;
  plano: Plan;
  aula: ClassType;
  createdAt: string;
}

export interface StudentFormData {
  nome: string;
  email: string;
  idade: string;
  telefone: string;
  plano: Plan;
  aula: ClassType;
}

export interface ValidationErrors {
  nome?: string;
  email?: string;
  idade?: string;
  telefone?: string;
  plano?: string;
  aula?: string;
}
