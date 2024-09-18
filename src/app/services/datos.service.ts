import { Injectable } from '@angular/core';
import { Semestre, Materia, Nota } from '../models/Datos'; // Importa las interfaces

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private semestres: Semestre[] = [];

  constructor() {}

  // Obtener los semestres
  getSemestres(): Semestre[] {
    return this.semestres;
  }

  // Agregar un semestre
  agregarSemestre(semestre: Semestre) {
    this.semestres.push(semestre);
  }

  // Agregar una materia a un semestre específico
  agregarMateria(semestreId: number, materiaId: number, materia: Materia): Materia {
    const semestre = this.semestres.find(s => s.id === semestreId);
    if (semestre) {
      semestre.materias.push(materia);
    }
    return materia; // Devolvemos el objeto materia
  }
  

  // Eliminar una materia de un semestre específico
  eliminarMateria(semestreId: number, materiaId: number) {
    const semestre = this.semestres.find(s => s.id === semestreId);
    if (semestre) {
      semestre.materias = semestre.materias.filter((m: { id: number; }) => m.id !== materiaId);
    }
  }

  // Agregar o actualizar notas para una materia específica
  actualizarNota(semestreId: number, materiaId: number, nota: Nota) {
    const semestre = this.semestres.find(s => s.id === semestreId);
    const materia = semestre?.materias.find((m: { id: number; }) => m.id === materiaId);
    if (materia) {
      const notaExistente = materia.notas.find((n: { corte: any; }) => n.corte === nota.corte);
      if (notaExistente) {
        notaExistente.calificacion = nota.calificacion; // Actualiza la calificación
      } else {
        materia.notas.push(nota); // Agrega la nueva nota
      }
    }
  }
}
