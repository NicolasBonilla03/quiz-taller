import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule, AlertController } from '@ionic/angular'; 
import { MateriasService } from '../services/materias.service';
import { Materia } from '../models/materia.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.page.html',
  styleUrls: ['./materia-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule]
})
export class MateriaListPage implements OnInit {
  materias: Materia[] = [];
  materiasFiltradas: Materia[] = [];
  searchTerm: string = '';
  semestres: number[] = [];

  constructor(
    private materiasService: MateriasService,
    private alertController: AlertController 
  ) {}

  async ngOnInit() {
    this.materias = await this.materiasService.getMaterias();
    this.materiasFiltradas = [...this.materias]; // Mostrar todas las materias al principio
    this.semestres = [...new Set(this.materias.map(materia => materia.semestre))]; // Obtener semestres únicos
  }

   buscarMaterias() {
    this.materiasFiltradas = this.materias.filter(materia =>
      materia.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filtrarPorSemestre(event: any) {
    const semestreSeleccionado = event.detail.value;

    if (semestreSeleccionado) {
      this.materiasFiltradas = this.materias.filter(
        materia => materia.semestre === semestreSeleccionado
      );
    }
  }

  mostrarTodasMaterias() {
    this.materiasFiltradas = [...this.materias];
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
