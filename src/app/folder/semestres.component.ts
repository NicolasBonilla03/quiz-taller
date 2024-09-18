import { Component } from '@angular/core';
import { MateriasService } from '../services/datos.service';
import { Semestre } from '../models/Datos';

    
@Component({
  selector: 'app-semestres',
  templateUrl: 'semestres.component.html',
})
export class SemestresComponent {
  semestres: Semestre[];

  constructor(private materiasService: MateriasService) {
    this.semestres = this.materiasService.getSemestres();
  }

  // Función para agregar un semestre
  agregarSemestre() {
    const nuevoSemestre: Semestre = { id: Date.now(), nombre: 'Semestre X', materias: [] };
    this.materiasService.agregarSemestre(nuevoSemestre);
  }
}
