import { Component } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { Materia } from '../models/materia.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.page.html',
  styleUrls: ['./add-materia.page.scss'],
  standalone: true, 
  imports: [IonicModule, FormsModule, RouterModule],
})
export class AddMateriaPage {

  materia: Materia = {
    nombre: '',
    semestre: '',
    codigo: '',
    horario: '',
    observaciones: ''
  };

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
