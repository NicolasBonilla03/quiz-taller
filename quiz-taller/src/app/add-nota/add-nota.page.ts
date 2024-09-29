import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { Nota } from '../models/nota.model';
import { Materia } from '../models/materia.model';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-nota',
  templateUrl: './add-nota.page.html',
  styleUrls: ['./add-nota.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, RouterLink]
})
export class AddNotaPage {
  materia?: Materia;
  nota: Nota = {
      fechaEntrega: '', 
      nota: 0, 
      corte: '',
      descripcion: '',
      observaciones: ''
  };

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
    const codigo = this.route.snapshot.paramMap.get('codigo');
    const materias = await this.materiasService.getMaterias();
    this.materia = materias.find(m => m.codigo === codigo)!;
  }

  async agregarNota() {
    if (this.materia) {
      await this.materiasService.addNota(this.materia.codigo, this.nota);
      this.router.navigate(['/materia-detail', this.materia.codigo]);
      const alert = await this.alertController.create({
        header: 'Nota Agregada',
        message: 'La nota ha sido registrada correctamente.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              window.location.reload();
            }
          }
        ]
      });
      await alert.present();
    }
  }
}
