// Componente para exibir os tipos de aulas da academia com horários

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, 
  Heart, 
  Zap, 
  Users, 
  Music, 
  Timer,
  Clock 
} from 'lucide-react';

interface ClassSchedule {
  dia: string;
  horarios: string[];
}

interface ClassType {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  icon: React.ElementType;
  horarios: ClassSchedule[];
}

const classTypes: ClassType[] = [
  {
    id: '1',
    nome: 'Musculação',
    descricao: 'Treino de força com equipamentos modernos',
    duracao: '60 min',
    icon: Dumbbell,
    horarios: [
      { dia: 'Seg-Sex', horarios: ['06:00', '08:00', '10:00', '14:00', '16:00', '18:00', '20:00'] },
      { dia: 'Sáb', horarios: ['08:00', '10:00', '12:00'] },
    ],
  },
  {
    id: '2',
    nome: 'Spinning',
    descricao: 'Aula intensa de ciclismo indoor',
    duracao: '45 min',
    icon: Zap,
    horarios: [
      { dia: 'Seg-Qua-Sex', horarios: ['07:00', '18:00', '19:00'] },
      { dia: 'Ter-Qui', horarios: ['06:30', '17:30'] },
    ],
  },
  {
    id: '3',
    nome: 'Yoga',
    descricao: 'Relaxamento e flexibilidade corporal',
    duracao: '60 min',
    icon: Heart,
    horarios: [
      { dia: 'Seg-Qua-Sex', horarios: ['07:00', '09:00', '19:00'] },
      { dia: 'Sáb', horarios: ['09:00', '11:00'] },
    ],
  },
  {
    id: '4',
    nome: 'CrossFit',
    descricao: 'Treino funcional de alta intensidade',
    duracao: '50 min',
    icon: Timer,
    horarios: [
      { dia: 'Seg-Qua-Sex', horarios: ['06:00', '07:00', '17:00', '18:00', '19:00'] },
      { dia: 'Ter-Qui', horarios: ['06:00', '18:00', '19:00'] },
      { dia: 'Sáb', horarios: ['08:00', '09:00', '10:00'] },
    ],
  },
  {
    id: '5',
    nome: 'Dança',
    descricao: 'Aulas de zumba e ritmos variados',
    duracao: '45 min',
    icon: Music,
    horarios: [
      { dia: 'Ter-Qui', horarios: ['10:00', '18:00', '19:00'] },
      { dia: 'Sáb', horarios: ['10:00', '11:00'] },
    ],
  },
  {
    id: '6',
    nome: 'Funcional',
    descricao: 'Treino em grupo com exercícios funcionais',
    duracao: '45 min',
    icon: Users,
    horarios: [
      { dia: 'Seg-Qua-Sex', horarios: ['06:30', '08:00', '17:00', '18:30'] },
      { dia: 'Ter-Qui', horarios: ['07:00', '19:00'] },
    ],
  },
];

export function ClassTypes() {
  return (
    <section className="py-6">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Tipos de Aulas
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classTypes.map((classType) => {
          const Icon = classType.icon;
          return (
            <Card 
              key={classType.id} 
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {classType.nome}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {classType.descricao}
                    </p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {classType.duracao}
                    </Badge>
                  </div>
                </div>
                
                {/* Horários */}
                <div className="border-t border-border pt-3 mt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">Horários disponíveis</span>
                  </div>
                  <div className="space-y-2">
                    {classType.horarios.map((schedule, idx) => (
                      <div key={idx} className="text-xs">
                        <span className="font-medium text-foreground">{schedule.dia}:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {schedule.horarios.map((horario, hIdx) => (
                            <span 
                              key={hIdx}
                              className="px-1.5 py-0.5 bg-muted rounded text-muted-foreground"
                            >
                              {horario}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
