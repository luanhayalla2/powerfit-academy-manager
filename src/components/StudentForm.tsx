// Componente de formulário para cadastro/edição de aluno

import { useState, useEffect } from 'react';
import { Student, StudentFormData, ValidationErrors, Plan } from '@/types/student';
import { validateStudentForm } from '@/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, X, Dumbbell } from 'lucide-react';

interface StudentFormProps {
  student?: Student | null;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const initialFormData: StudentFormData = {
  nome: '',
  email: '',
  idade: '',
  telefone: '',
  plano: 'mensal',
};

export function StudentForm({ student, onSubmit, onCancel, isLoading }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Preencher formulário quando editar aluno existente
  useEffect(() => {
    if (student) {
      setFormData({
        nome: student.nome,
        email: student.email,
        idade: String(student.idade),
        telefone: student.telefone,
        plano: student.plano,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
    setTouched({});
  }, [student]);

  // Atualizar campo do formulário
  const handleChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validar campo ao alterar (se já foi tocado)
    if (touched[field]) {
      const newErrors = validateStudentForm({ ...formData, [field]: value });
      setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  // Marcar campo como tocado ao sair
  const handleBlur = (field: keyof StudentFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validateStudentForm(formData);
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
  };

  // Submeter formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos os campos
    const validationErrors = validateStudentForm(formData);
    setErrors(validationErrors);
    
    // Marcar todos como tocados
    setTouched({
      nome: true,
      email: true,
      idade: true,
      telefone: true,
      plano: true,
    });
    
    // Se não houver erros, enviar
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const isEditing = !!student;

  return (
    <Card className="w-full max-w-lg mx-auto border-primary/20">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <Dumbbell className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">
          {isEditing ? 'Editar Aluno' : 'Novo Aluno'}
        </CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Atualize os dados do aluno abaixo'
            : 'Preencha os dados para cadastrar um novo aluno'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              placeholder="Digite o nome completo"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              onBlur={() => handleBlur('nome')}
              className={errors.nome ? 'border-destructive' : ''}
            />
            {errors.nome && (
              <p className="text-sm text-destructive">{errors.nome}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Idade e Telefone lado a lado */}
          <div className="grid grid-cols-2 gap-4">
            {/* Idade */}
            <div className="space-y-2">
              <Label htmlFor="idade">Idade</Label>
              <Input
                id="idade"
                type="number"
                placeholder="Ex: 25"
                value={formData.idade}
                onChange={(e) => handleChange('idade', e.target.value)}
                onBlur={() => handleBlur('idade')}
                className={errors.idade ? 'border-destructive' : ''}
              />
              {errors.idade && (
                <p className="text-sm text-destructive">{errors.idade}</p>
              )}
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                placeholder="11999999999"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                onBlur={() => handleBlur('telefone')}
                className={errors.telefone ? 'border-destructive' : ''}
              />
              {errors.telefone && (
                <p className="text-sm text-destructive">{errors.telefone}</p>
              )}
            </div>
          </div>

          {/* Plano */}
          <div className="space-y-3">
            <Label>Plano</Label>
            <RadioGroup
              value={formData.plano}
              onValueChange={(value) => handleChange('plano', value as Plan)}
              className="grid grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-input hover:border-primary/50 transition-colors cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                <RadioGroupItem value="mensal" id="mensal" />
                <Label htmlFor="mensal" className="cursor-pointer font-normal">
                  Mensal
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-input hover:border-primary/50 transition-colors cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                <RadioGroupItem value="trimestral" id="trimestral" />
                <Label htmlFor="trimestral" className="cursor-pointer font-normal">
                  Trimestral
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-input hover:border-primary/50 transition-colors cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                <RadioGroupItem value="anual" id="anual" />
                <Label htmlFor="anual" className="cursor-pointer font-normal">
                  Anual
                </Label>
              </div>
            </RadioGroup>
            {errors.plano && (
              <p className="text-sm text-destructive">{errors.plano}</p>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
