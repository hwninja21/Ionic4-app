import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'  
import { IonicModule } from '@ionic/angular';

import { Tab6Page } from './tab6.page';

const routes: Routes = [
  {
    path: '',
    component: Tab6Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvk1Lw5XQZ_PmZQPQ4pv0sDHbeoIbJC5g'}),
      AgmDirectionModule
  ],


  
  declarations: [Tab6Page]
})
export class Tab6PageModule {}
