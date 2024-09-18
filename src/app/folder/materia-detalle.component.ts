import { Component, Input } from '@angular/core';
import { Materia } from '../models/Datos';

@Component({
  selector: 'app-materia-detalle',
  templateUrl: './materia-detalle.component.html',
})
export class MateriaDetalleComponent {
  @Input() materia: Materia | undefined;

  calcularPromedio(): number {
    let total = 0;
    this.materia!.notas.forEach(nota => {
      total += (nota.calificacion * nota.porcentaje) / 100;
    });
    return total;
  }

  estaAprobada(): boolean {
    return this.calcularPromedio() >= 3.0; // Suponiendo que 3.0 es la nota mínima para aprobar
  }
}
