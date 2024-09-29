import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page'; // Importar correctamente HomePage
import { MateriaListPage } from './materia-list/materia-list.page';
import { MateriaDetailPage } from './materia-detail/materia-detail.page';
import { AddMateriaPage } from './add-materia/add-materia.page';
import { AddNotaPage } from './add-nota/add-nota.page';
import { EditMateriaPage } from './edit-materia/edit-materia.page';
import { EditNotaPage } from './edit-nota/edit-nota.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'materia-list', component: MateriaListPage },
  { path: 'materia-detail/:codigo', component: MateriaDetailPage },
  { path: 'add-nota/:codigo', component: AddNotaPage },
  { path: 'add-materia', component: AddMateriaPage },
  { path: 'edit-materia/:codigo', component: EditMateriaPage },
  { path: 'edit-nota/:codigo', component: EditNotaPage},
  { path: 'edit-nota/:codigo/:index', component: EditNotaPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
