import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { Materia } from '../models/materia.model';
import { Nota } from '../models/nota.model';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-materia',
  templateUrl: './edit-materia.page.html',
  styleUrls: ['./edit-materia.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class EditMateriaPage implements OnInit {
  materia!: Materia;
  nuevaNota: Nota = {
    fechaEntrega: '',
    nota: 0,
    corte: '',
    descripcion: ''
  };

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    const materias = await this.materiasService.getMaterias();
    this.materia = materias.find(m => m.codigo === codigo)!;
  }

  async guardarCambios() {
    await this.materiasService.updateMateria(this.materia);
    const alert = await this.alertController.create({
      header: 'Cambios guardados',
      message: 'Los datos de la materia se han actualizado correctamente.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/materia-detail', this.materia.codigo]);
            window.location.reload();
          }
        }
      ]
    });
    await alert.present();
  }

}
