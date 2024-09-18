import { Component, Input } from '@angular/core';
import { MateriasService } from '../services/datos.service';
import { Materia, Semestre } from '../models/Datos';



@Component({
  selector: 'app-materias',
  templateUrl: 'materias.component.html',
})
export class MateriasComponent {
  @Input() semestre!: Semestre;

  constructor(private materiasService: MateriasService) {}

  // Función para agregar una materia
  agregarMateria(semestreId: number, materiaId: number, materia: Materia): void {
    const nuevaMateria: Materia = {
        id: materiaId,
        nombre: 'Nueva Materia',
        notas: []
      };
      
      this.materiasService.agregarMateria(semestreId, materiaId, nuevaMateria);
  }

  // Función para eliminar una materia
  eliminarMateria(materiaId: number) {
    this.materiasService.eliminarMateria(this.semestre.id, materiaId);
  }
}
