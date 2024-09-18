import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from '../services/datos.service';
import { Materia } from '../models/Datos';

@Component({
  selector: 'app-materia-form',
  templateUrl: './materia-form.component.html',
})
export class MateriaFormComponent {
  @Input() semestreId!: number;  // Semestre al que se va a agregar la materia
  @Input() materia?: Materia;   // Si se pasa una materia, se está modificando

  materiaForm: FormGroup;

  constructor(private fb: FormBuilder, private materiasService: MateriasService) {
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

 ngOnInit() {
  if (this.materia) {
    this.materiaForm.patchValue(this.materia);  // Poner los datos en el formulario si estamos editando
  }
}


  guardarMateria() {
    if (this.materia) {
      // Si existe la materia, estamos en modo edición
      this.materia.nombre = this.materiaForm.value.nombre;
    } else {
      // Generar un nuevo ID para la materia
      const nuevoMateriaId = Date.now();  // O cualquier otro mecanismo para generar IDs únicos

      // Crear la nueva materia
      const nuevaMateria: Materia = {
        id: nuevoMateriaId,
        nombre: this.materiaForm.value.nombre,
        notas: []
      };

      // Llamar al servicio para agregar la materia
      this.materiasService.agregarMateria(this.semestreId, nuevoMateriaId, nuevaMateria);
    }
  }
}