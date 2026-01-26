// Componente para exibir os tipos de aulas da academia

import { Card, CardContent } from '@/components/ui/card';
import { 
  Dumbbell, 
  Heart, 
  Zap, 
  Users, 
  Music, 
  Timer 
} from 'lucide-react';

interface ClassType {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  icon: React.ElementType;
}

const classTypes: ClassType[] = [
  {
    id: '1',
    nome: 'Musculação',
    descricao: 'Treino de força com equipamentos modernos',
    duracao: '60 min',
    icon: Dumbbell,
  },
  {
    id: '2',
    nome: 'Spinning',
    descricao: 'Aula intensa de ciclismo indoor',
    duracao: '45 min',
    icon: Zap,
  },
  {
    id: '3',
    nome: 'Yoga',
    descricao: 'Relaxamento e flexibilidade corporal',
    duracao: '60 min',
    icon: Heart,
  },
  {
    id: '4',
    nome: 'CrossFit',
    descricao: 'Treino funcional de alta intensidade',
    duracao: '50 min',
    icon: Timer,
  },
  {
    id: '5',
    nome: 'Dança',
    descricao: 'Aulas de zumba e ritmos variados',
    duracao: '45 min',
    icon: Music,
  },
  {
    id: '6',
    nome: 'Funcional',
    descricao: 'Treino em grupo com exercícios funcionais',
    duracao: '45 min',
    icon: Users,
  },
];

export function ClassTypes() {
  return (
    <section className="py-6">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Tipos de Aulas
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {classTypes.map((classType) => {
          const Icon = classType.icon;
          return (
            <Card 
              key={classType.id} 
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">
                  {classType.nome}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {classType.descricao}
                </p>
                <span className="text-xs font-medium text-primary">
                  {classType.duracao}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
