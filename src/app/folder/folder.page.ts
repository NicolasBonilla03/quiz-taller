import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from '../services/datos.service';
import { Materia, Semestre } from '../models/Datos';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder!: string;
  public semestres: Semestre[] = [];
  private activatedRoute = inject(ActivatedRoute);
  private nextMateriaId: number = 1; // Definir un ID inicial para materias

  constructor(private materiasService: MateriasService, private alertController: AlertController) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.folder = 'Materias y Notas'; // Puedes cambiar este valor a lo que desees mostrar
    this.semestres = this.materiasService.getSemestres(); // Obtener los semestres

    // Generar el próximo ID de materia, esto puede mejorarse según tu lógica
    const allMaterias = this.semestres.flatMap(s => s.materias);
    if (allMaterias.length > 0) {
      this.nextMateriaId = Math.max(...allMaterias.map(m => m.id)) + 1;
    }
  }

  agregarMateria(semestreId: number, materia: Materia): void {
    this.materiasService.agregarMateria(semestreId, materia.id, materia);
    this.semestres = this.materiasService.getSemestres(); // Actualizar lista de semestres
  }

  async confirmarEliminacionMateria(semestreId: number, materiaId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta materia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            const nuevaMateria: Materia = {
              id: this.nextMateriaId++,
              nombre: 'Nueva Materia',
              notas: []
            };
            const materia = this.materiasService.agregarMateria(semestreId, materiaId, nuevaMateria);
            if (materia && materia.notas.length === 0) {
              this.materiasService.eliminarMateria(semestreId, materiaId);
            } else {
              alert.message = 'No se puede eliminar la materia, ya tiene notas registradas.';
              alert.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  crearNuevaMateria(semestreId: number) {
    const nuevaMateria: Materia = {
      id: this.nextMateriaId++,
      nombre: 'Nueva Materia',
      notas: []
    };

    this.agregarMateria(semestreId, nuevaMateria);
  }
}
