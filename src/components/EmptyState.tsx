// Componente para exibir estado vazio (sem alunos cadastrados)

import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Users className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Nenhum aluno cadastrado</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Comece cadastrando seu primeiro aluno para gerenciar os membros da academia.
      </p>
      <Button onClick={onAddClick} size="lg">
        <Plus className="h-5 w-5 mr-2" />
        Cadastrar Primeiro Aluno
      </Button>
    </div>
  );
}
