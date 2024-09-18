import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from '../services/datos.service';
import { Materia, Nota } from '../models/Datos';

@Component({
  selector: 'app-nota-form',
  templateUrl: './nota-form.component.html',
})
export class NotaFormComponent {
  @Input() materiaId: number | undefined; // La materia a la que se va a agregar o modificar una nota
  @Input() nota?: Nota; // Si se pasa una nota, se está modificando
  notaForm: FormGroup;

  constructor(private fb: FormBuilder, private materiasService: MateriasService) {
    this.notaForm = this.fb.group({
      corte: ['', Validators.required],
      porcentaje: ['', Validators.required],
      calificacion: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.nota) {
      this.notaForm.patchValue(this.nota); // Rellenar los datos si se está editando
    }
  }

  guardarNota() {
    const nuevaNota: Nota = {
      corte: this.notaForm.value.corte,
      porcentaje: this.notaForm.value.porcentaje,
      calificacion: this.notaForm.value.calificacion
    };

    if (this.nota) {
      // Actualizar nota existente
      this.materiasService.actualizarNota(1, this.materiaId!, nuevaNota); // Actualiza
    } else {
      // Agregar nueva nota
      this.materiasService.actualizarNota(1, this.materiaId!, nuevaNota);
    }
  }
}
