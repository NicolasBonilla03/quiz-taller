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
  imports: [IonicModule, CommonModule, RouterLink] // Añadir CommonModule aquí
})
export class MateriaListPage implements OnInit {
  materias: Materia[] = [];

  constructor(
    private materiasService: MateriasService,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  async ngOnInit() {
    this.materias = await this.materiasService.getMaterias();
  }

  // Función para eliminar una materia solo si no tiene notas
  async confirmDeleteMateria(codigo: string) {
    const materia = this.materias.find(m => m.codigo === codigo);

    if (materia) {
      if (materia.notas && materia.notas.length > 0) {
        // Mostrar mensaje de error si tiene notas
        const notaAlert = await this.alertController.create({
          header: 'Error',
          message: 'No se puede eliminar la materia porque tiene notas registradas.',
          buttons: ['OK'],
        });
        await notaAlert.present();
        return;
      }

      // Mostrar confirmación de eliminación si no tiene notas
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

  // Función para eliminar una materia
  async deleteMateria(codigo: string) {
    await this.materiasService.deleteMateria(codigo);
    this.materias = await this.materiasService.getMaterias();
  }

  calcularPromedio(materia: Materia): number {
    if (materia.notas && materia.notas.length > 0) {
      const total = materia.notas.reduce((acc, nota) => acc + (nota.nota || 0), 0);
      return total / materia.notas.length;
    }
    return 0;
  }

  isMateriaAprobada(promedio: number): boolean {
    return promedio >= 3;
  }
}
