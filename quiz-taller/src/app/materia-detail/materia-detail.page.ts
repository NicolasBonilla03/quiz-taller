import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { Materia } from '../models/materia.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-materia-detail',
  templateUrl: './materia-detail.page.html',
  styleUrls: ['./materia-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule], 
})
export class MateriaDetailPage implements OnInit {
    materia: Materia | undefined;
    i!: number;

    promedioPrimerCorte: number = 0;
    promedioSegundoCorte: number = 0;
    promedioTercerCorte: number = 0;
    promedioFinalCorte: number = 0;

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

    calcularPromedio(): number {
      if (!this.materia?.notas || this.materia.notas.length === 0) {
        return 0;
      }
  
      const primerCorteNotas = this.materia.notas.filter(nota => nota.corte === 'Primer 20%');
      const segundoCorteNotas = this.materia.notas.filter(nota => nota.corte === 'Segundo 20%');
      const tercerCorteNotas = this.materia.notas.filter(nota => nota.corte === 'Tercer 20%');
      const finalCorteNotas = this.materia.notas.filter(nota => nota.corte === '40% Final');
  
      this.promedioPrimerCorte = this.calcularPromedioPorCorte(primerCorteNotas);
      this.promedioSegundoCorte = this.calcularPromedioPorCorte(segundoCorteNotas);
      this.promedioTercerCorte = this.calcularPromedioPorCorte(tercerCorteNotas);
      this.promedioFinalCorte = this.calcularPromedioPorCorte(finalCorteNotas);
  
      const promedioPonderado = 
        (this.promedioPrimerCorte * 0.2) +
        (this.promedioSegundoCorte * 0.2) +
        (this.promedioTercerCorte * 0.2) +
        (this.promedioFinalCorte * 0.4);
  
      return promedioPonderado;
    }
    
    calcularPromedioPorCorte(notas: any[]): number {
      if (notas.length === 0) {
        return 0;
      }
    
      const total = notas.reduce((acc, nota) => acc + (nota.nota || 0), 0);
      return total / notas.length;
    }

    isMateriaAprobada(): boolean {
      const promedio = this.calcularPromedio();
      return promedio >= 3;
    }

    async agregarNota(nota: any) {
      if (this.materia) {
        this.materia.notas!.push(nota);
        await this.materiasService.updateMateria(this.materia);
      }
    }
    
    async eliminarNota(codigoMateria: string, index: number) {
        await this.materiasService.deleteNota(codigoMateria, index);
        this.materia = await (await this.materiasService.getMaterias()).find(m => m.codigo === codigoMateria);
      }
    
    async actualizar(){
        window.location.reload();
      }
      
}
