import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { Materia } from '../models/materia.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-materia-detail',
  templateUrl: './materia-detail.page.html',
  styleUrls: ['./materia-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule], // Agregar CommonModule aquí
})
export class MateriaDetailPage implements OnInit {
    materia: Materia | undefined;
    i!: number;

    constructor(
      private route: ActivatedRoute,
      private materiasService: MateriasService
    ) {}

    async ngOnInit() {
      const codigo = this.route.snapshot.paramMap.get('codigo');
      const materias = await this.materiasService.getMaterias();
      this.materia = materias.find(m => m.codigo === codigo);

      if (!this.materia) {
        console.error('Materia no encontrada');
      }
    }

    calcularPromedio (): number  {
        if (this.materia?.notas && this.materia?.notas.length > 0) {
          const total = this.materia.notas.reduce((acc, nota) => acc + (nota.nota || 0), 0);
          return total / this.materia.notas.length;
        }
        return 0;
      }

    isMateriaAprobada(): boolean {
      const promedio = this.calcularPromedio();
      return promedio >= 3;
    }

    // Método para agregar una nota (puedes llamar a este método desde tu plantilla)
    async agregarNota(nota: any) {
      if (this.materia) {
        this.materia.notas!.push(nota);
        await this.materiasService.updateMateria(this.materia); // Guarda los cambios en el servicio
      }
    }
    
    async eliminarNota(codigoMateria: string, index: number) {
        await this.materiasService.deleteNota(codigoMateria, index);
        this.materia = await (await this.materiasService.getMaterias()).find(m => m.codigo === codigoMateria);
      }
      
}
