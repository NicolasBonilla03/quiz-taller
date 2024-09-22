import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private materias: Materia[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Asegúrate de que la base de datos se cree
    await this.storage.create();
    // Luego carga las materias desde el almacenamiento
    const storedMaterias = await this.storage.get('materias');
    this.materias = storedMaterias ? JSON.parse(storedMaterias) : [];
  }

  async getMaterias() {
    // Actualiza el estado de materias al obtenerlas
    const storedMaterias = await this.storage.get('materias');
    this.materias = storedMaterias ? JSON.parse(storedMaterias) : [];
    return this.materias;
  }

  async addMateria(materia: Materia) {
    this.materias.push(materia);
    await this.saveToStorage();
  }

  async updateMateria(materia: Materia) {
    const index = this.materias.findIndex(m => m.codigo === materia.codigo);
    if (index > -1) {
      this.materias[index] = materia;
      await this.saveToStorage();
    }
  }

  async deleteMateria(codigo: string) {
    this.materias = this.materias.filter(m => m.codigo !== codigo);
    await this.saveToStorage();
  }

  private async saveToStorage() {
    await this.storage.set('materias', JSON.stringify(this.materias));
  }

  async deleteNota(codigoMateria: string, index: number) {
    const materia = this.materias.find(m => m.codigo === codigoMateria);
    if (materia && materia.notas) {
      materia.notas.splice(index, 1); // Eliminar la nota en el índice dado
      await this.saveToStorage(); // Guardar los cambios en el almacenamiento
    }
  }

  async deleteMateriaIfNoNotas(codigo: string): Promise<boolean> {
    const materia = this.materias.find(m => m.codigo === codigo);
    if (materia && (!materia.notas || materia.notas.length === 0)) {
      this.materias = this.materias.filter(m => m.codigo !== codigo);
      await this.saveToStorage();
      return true; // Materia eliminada con éxito
    }
    return false; // La materia no puede ser eliminada porque tiene notas
  }
  
  
}
