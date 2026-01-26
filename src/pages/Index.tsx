// Página principal - Sistema PowerFit Academia
// Gerenciamento completo de alunos com CRUD

import { useState, useEffect } from 'react';
import { Student, StudentFormData } from '@/types/student';
import { 
  getStudents, 
  addStudent, 
  updateStudent, 
  deleteStudent 
} from '@/services/studentStorage';
import { StudentCard } from '@/components/StudentCard';
import { StudentForm } from '@/components/StudentForm';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { 
  Plus, 
  Dumbbell, 
  Users, 
  Search,
  ArrowLeft 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ClassTypes } from '@/components/ClassTypes';

type ViewMode = 'list' | 'form';

const Index = () => {
  // Estados principais
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar alunos do localStorage ao montar
  useEffect(() => {
    loadStudents();
  }, []);

  // Filtrar alunos quando busca ou lista mudar
  useEffect(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      setFilteredStudents(
        students.filter(
          s => 
            s.nome.toLowerCase().includes(term) ||
            s.email.toLowerCase().includes(term) ||
            s.telefone.includes(term)
        )
      );
    } else {
      setFilteredStudents(students);
    }
  }, [students, searchTerm]);

  // Carregar lista de alunos
  const loadStudents = () => {
    const data = getStudents();
    setStudents(data);
  };

  // Abrir formulário para novo aluno
  const handleAddNew = () => {
    setEditingStudent(null);
    setViewMode('form');
  };

  // Abrir formulário para editar aluno
  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setViewMode('form');
  };

  // Confirmar exclusão de aluno
  const handleDeleteClick = (student: Student) => {
    setDeletingStudent(student);
  };

  // Executar exclusão
  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      const success = deleteStudent(deletingStudent.id);
      if (success) {
        toast.success('Aluno excluído com sucesso!');
        loadStudents();
      } else {
        toast.error('Erro ao excluir aluno.');
      }
      setDeletingStudent(null);
    }
  };

  // Submeter formulário (criar ou atualizar)
  const handleFormSubmit = (data: StudentFormData) => {
    setIsLoading(true);
    
    try {
      if (editingStudent) {
        // Atualizar aluno existente
        updateStudent(editingStudent.id, {
          nome: data.nome,
          email: data.email,
          idade: parseInt(data.idade),
          telefone: data.telefone.replace(/\D/g, ''),
          plano: data.plano,
        });
        toast.success('Aluno atualizado com sucesso!');
      } else {
        // Criar novo aluno
        addStudent({
          nome: data.nome,
          email: data.email,
          idade: parseInt(data.idade),
          telefone: data.telefone.replace(/\D/g, ''),
          plano: data.plano,
        });
        toast.success('Aluno cadastrado com sucesso!');
      }
      
      loadStudents();
      setViewMode('list');
      setEditingStudent(null);
    } catch (error) {
      toast.error('Erro ao salvar aluno.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancelar formulário
  const handleFormCancel = () => {
    setViewMode('list');
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e título */}
            <div className="flex items-center gap-3">
              {viewMode === 'form' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFormCancel}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">PowerFit</h1>
                <p className="text-xs text-muted-foreground">
                  Sistema de Academia
                </p>
              </div>
            </div>

            {/* Contador de alunos */}
            {viewMode === 'list' && students.length > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {students.length} {students.length === 1 ? 'aluno' : 'alunos'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-6">
        {viewMode === 'list' ? (
          <>
            {/* Seção de Tipos de Aulas */}
            <ClassTypes />

            {/* Barra de busca e botão adicionar */}
            {students.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar aluno por nome, e-mail ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleAddNew} className="shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Aluno
                </Button>
              </div>
            )}

            {/* Lista de alunos ou estado vazio */}
            {students.length === 0 ? (
              <EmptyState onAddClick={handleAddNew} />
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Nenhum aluno encontrado para "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Formulário de cadastro/edição */
          <div className="py-4">
            <StudentForm
              student={editingStudent}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      {/* Diálogo de confirmação de exclusão */}
      <DeleteConfirmDialog
        student={deletingStudent}
        open={!!deletingStudent}
        onOpenChange={(open) => !open && setDeletingStudent(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Index;
