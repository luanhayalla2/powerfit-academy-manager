// Serviço para manipulação do localStorage - persistência de dados dos alunos

import { Student } from '@/types/student';

const STORAGE_KEY = 'powerfit_students';

// Buscar todos os alunos do localStorage
export const getStudents = (): Student[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    return [];
  }
};

// Salvar lista de alunos no localStorage
export const saveStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Erro ao salvar alunos:', error);
  }
};

// Adicionar um novo aluno
export const addStudent = (student: Omit<Student, 'id' | 'createdAt'>): Student => {
  const students = getStudents();
  const newStudent: Student = {
    ...student,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

// Atualizar dados de um aluno existente
export const updateStudent = (id: string, data: Partial<Student>): Student | null => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  
  if (index === -1) return null;
  
  students[index] = { ...students[index], ...data };
  saveStudents(students);
  return students[index];
};

// Excluir um aluno pelo ID
export const deleteStudent = (id: string): boolean => {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  
  if (filtered.length === students.length) return false;
  
  saveStudents(filtered);
  return true;
};

// Buscar aluno por ID
export const getStudentById = (id: string): Student | null => {
  const students = getStudents();
  return students.find(s => s.id === id) || null;
};
