import { Nota } from './nota.model';

export interface Materia {
  nombre: string;
  semestre: string;
  codigo: string;
  horario: string;
  observaciones?: string;
  notas?: Nota[];
  promedioAcumulado?: number;
}
