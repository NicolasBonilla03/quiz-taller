import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports:[IonicModule, RouterLink, RouterModule]
})
export class HomePage {

  constructor() {}

}
