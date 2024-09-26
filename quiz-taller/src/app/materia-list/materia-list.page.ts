import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { IonicModule, AlertController } from '@ionic/angular'; // Importar AlertController
import { MateriasService } from '../services/materias.service';
import { Materia } from '../models/materia.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.page.html',
  styleUrls: ['./materia-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class MateriaListPage implements OnInit {
  materias: Materia[] = [];

  constructor(
    private materiasService: MateriasService,
    private alertController: AlertController 
  ) {}

  async ngOnInit() {
    this.materias = await this.materiasService.getMaterias();
  }

  async confirmDeleteMateria(codigo: string) {
    const materia = this.materias.find(m => m.codigo === codigo);

    if (materia) {
      if (materia.notas && materia.notas.length > 0) {
        const notaAlert = await this.alertController.create({
          header: 'Error',
          message: 'No se puede eliminar la materia porque tiene notas registradas.',
          buttons: ['OK'],
        });
        await notaAlert.present();
        return;
      }

      const alert = await this.alertController.create({
        header: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar esta materia?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Eliminación cancelada');
            },
          },
          {
            text: 'Eliminar',
            handler: async () => {
              await this.deleteMateria(codigo);
            },
          },
        ],
      });

      await alert.present();
    }
  }

  async deleteMateria(codigo: string) {
    await this.materiasService.deleteMateria(codigo);
    this.materias = await this.materiasService.getMaterias();
  }

}
