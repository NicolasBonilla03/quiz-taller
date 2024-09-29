import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { Materia } from '../models/materia.model';
import { Nota } from '../models/nota.model';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class EditNotaPage implements OnInit {
  materia!: Materia;
  nota!: Nota; 
  codigoMateria: string = '';
  indexNota: number = -1;

  requisitos: FormGroup = new FormGroup({
    fechaEntrega: new FormControl ('', [Validators.required]),
    nota: new FormControl (0, [Validators.max(5)]),
    corte: new FormControl ('', [Validators.required]),
    descripcion: new FormControl ('', [Validators.required]),
    observaciones: new FormControl ('')
  })


  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.codigoMateria = this.route.snapshot.paramMap.get('codigo')!;
    this.indexNota = +this.route.snapshot.paramMap.get('index')!; 
    const materias = await this.materiasService.getMaterias();
    this.materia = materias.find(m => m.codigo === this.codigoMateria)!;

    if (this.materia && this.indexNota !== -1) {
      this.nota = this.materia!.notas![this.indexNota];
    }
  }

  async guardarCambios() {
    if (this.materia && this.nota) {
      this.materia!.notas![this.indexNota] = this.nota;
      await this.materiasService.updateMateria(this.materia);
      const alert = await this.alertController.create({
        header: 'Cambios guardados',
        message: 'Los datos de la nota se han actualizado correctamente.',
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
}
