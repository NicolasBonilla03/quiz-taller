import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SemestresComponent } from '../app/folder/semestres.component';
import { MateriasComponent } from '../app/folder/materias.component';
import { NotasComponent } from '../app/folder/notas.component'; // Asegúrate de importar el componente


@NgModule({
  declarations: [AppComponent,
    SemestresComponent,
    MateriasComponent,
    NotasComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
