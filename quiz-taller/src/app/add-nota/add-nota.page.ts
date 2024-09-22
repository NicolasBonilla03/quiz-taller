import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { Nota } from '../models/nota.model';
import { Materia } from '../models/materia.model';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-nota',
  templateUrl: './add-nota.page.html',
  styleUrls: ['./add-nota.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class AddNotaPage {
  materia!: Materia;
  nota: Nota = {
      fechaEntrega: '', nota: 0, corte: '',
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

  async agregarNota() {
    if (this.materia) {
      this.materia.notas = this.materia.notas || [];
      this.materia.notas.push(this.nota);
      await this.materiasService.updateMateria(this.materia);
      this.router.navigate(['/materia-detail', this.materia.codigo]);
      const alert = await this.alertController.create({
        header: 'Nota agregada',
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
