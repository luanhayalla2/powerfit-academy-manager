// Componente de card para exibição dos dados do aluno

import { Student, ClassType } from '@/types/student';
import { formatPhone, formatPlan } from '@/utils/validation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Mail, Phone, Calendar, User, Dumbbell, Zap, Heart, Timer, Music, Users } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

// Cores dos badges por tipo de plano
const planColors: Record<string, string> = {
  mensal: 'bg-secondary text-secondary-foreground',
  trimestral: 'bg-primary/80 text-primary-foreground',
  anual: 'bg-accent text-accent-foreground',
};

// Ícones e labels por tipo de aula
const classInfo: Record<ClassType, { icon: React.ElementType; label: string }> = {
  musculacao: { icon: Dumbbell, label: 'Musculação' },
  spinning: { icon: Zap, label: 'Spinning' },
  yoga: { icon: Heart, label: 'Yoga' },
  crossfit: { icon: Timer, label: 'CrossFit' },
  danca: { icon: Music, label: 'Dança' },
  funcional: { icon: Users, label: 'Funcional' },
};

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  const classData = student.aula ? classInfo[student.aula] : null;
  const ClassIcon = classData?.icon;

  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar com inicial do nome */}
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {student.nome.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{student.nome}</h3>
              <div className="flex gap-2 flex-wrap">
                <Badge className={planColors[student.plano]}>
                  {formatPlan(student.plano)}
                </Badge>
                {classData && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {ClassIcon && <ClassIcon className="h-3 w-3" />}
                    {classData.label}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Botões de ação */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(student)}
              className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(student)}
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2 text-sm">
        {/* E-mail */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{student.email}</span>
        </div>
        
        {/* Telefone */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{formatPhone(student.telefone)}</span>
        </div>
        
        {/* Idade */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{student.idade} anos</span>
        </div>
        
        {/* Data de cadastro */}
        <div className="flex items-center gap-2 text-muted-foreground/60 text-xs pt-2 border-t border-border">
          <Calendar className="h-3 w-3" />
          <span>
            Cadastrado em {new Date(student.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
