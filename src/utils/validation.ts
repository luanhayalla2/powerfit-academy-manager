// Utilitários de validação para o formulário de cadastro

import { StudentFormData, ValidationErrors } from '@/types/student';

// Regex para validação de e-mail
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex para telefone com DDD (10 ou 11 dígitos)
const PHONE_REGEX = /^\d{10,11}$/;

// Validar formulário de aluno
export const validateStudentForm = (data: StudentFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validar nome
  if (!data.nome.trim()) {
    errors.nome = 'Nome é obrigatório';
  } else if (data.nome.trim().length < 3) {
    errors.nome = 'Nome deve ter pelo menos 3 caracteres';
  }

  // Validar e-mail com regex
  if (!data.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'E-mail inválido';
  }

  // Validar idade (maior que 12 anos)
  const idade = parseInt(data.idade);
  if (!data.idade) {
    errors.idade = 'Idade é obrigatória';
  } else if (isNaN(idade) || idade <= 12) {
    errors.idade = 'Idade deve ser maior que 12 anos';
  } else if (idade > 120) {
    errors.idade = 'Idade inválida';
  }

  // Validar telefone com regex (10 ou 11 dígitos)
  const phoneDigits = data.telefone.replace(/\D/g, '');
  if (!data.telefone.trim()) {
    errors.telefone = 'Telefone é obrigatório';
  } else if (!PHONE_REGEX.test(phoneDigits)) {
    errors.telefone = 'Telefone deve ter 10 ou 11 dígitos (com DDD)';
  }

  // Validar plano
  if (!data.plano) {
    errors.plano = 'Selecione um plano';
  }

  return errors;
};

// Formatar telefone para exibição
export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
};

// Formatar plano para exibição
export const formatPlan = (plan: string): string => {
  const plans: Record<string, string> = {
    mensal: 'Mensal',
    trimestral: 'Trimestral',
    anual: 'Anual',
  };
  return plans[plan] || plan;
};
