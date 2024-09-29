import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { Materia } from '../models/materia.model';
import { Nota } from '../models/nota.model';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-materia',
  templateUrl: './edit-materia.page.html',
  styleUrls: ['./edit-materia.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class EditMateriaPage implements OnInit {
  materia!: Materia;


  requisitos: FormGroup = new FormGroup({
    nombre: new FormControl ('', [Validators.required]),
    semestre: new FormControl (0, [Validators.required, Validators.min(1), Validators.max(15)]),
    codigo: new FormControl ('', [Validators.required]),
    horario: new FormControl ('', [Validators.required]),
  })

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
          }
        }
      ]
    });
    await alert.present();
  }

}
