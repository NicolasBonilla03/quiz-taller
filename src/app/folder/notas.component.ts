import { Component, Input } from '@angular/core';
import { MateriasService } from '../services/datos.service';
import { Materia, Nota } from '../models/Datos';

@Component({
  selector: 'app-notas', // Asegúrate de que sea 'app-notas'
  templateUrl: './notas.component.html',
})
export class NotasComponent {
  @Input() materia!: Materia;

  constructor(private materiasService: MateriasService) {}

  // Función para agregar o actualizar una nota
  actualizarNota(corte: string, porcentaje: number, calificacion: number) {
    const nota: Nota = { corte, porcentaje, calificacion };
    this.materiasService.actualizarNota(1, this.materia.id, nota); // 1 es el semestreId
  }
}
