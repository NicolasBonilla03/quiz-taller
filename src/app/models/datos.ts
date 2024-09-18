export interface Nota {
    corte: string; // "primerCorte", "segundoCorte", etc.
    porcentaje: number; // 20, 20, 20, 40
    calificacion: number;
  }
  
  export interface Materia {
    id: number;
    nombre: string;
    notas: Nota[];
  }
  
  export interface Semestre {
    id: number;
    nombre: string;
    materias: Materia[];
  }