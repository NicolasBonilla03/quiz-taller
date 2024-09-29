import { Component } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { Materia } from '../models/materia.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.page.html',
  styleUrls: ['./add-materia.page.scss'],
  standalone: true, 
  imports: [IonicModule, FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
})
export class AddMateriaPage {

  materia: Materia = {
    nombre: '',
    semestre: 0,
    codigo: '',
    horario: '',
    observaciones: ''
  };

  requisitos: FormGroup = new FormGroup({
    nombre: new FormControl ('', [Validators.required]),
    semestre: new FormControl (0, [Validators.required, Validators.min(1), Validators.max(15)]),
    codigo: new FormControl ('', [Validators.required]),
    horario: new FormControl ('', [Validators.required]),
  })

  constructor(private materiasService: MateriasService,
    private alertController: AlertController
  ) {}

  async addMateria() {
    await this.materiasService.addMateria(this.materia);
    const alert = await this.alertController.create({
        header: 'Hecho!',
        message: 'La materia se ha agregado exitosamente!',
        buttons: [{
            text:'OK'
        }],
    });
    await alert.present();
    return;
  }
}
