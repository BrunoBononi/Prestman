import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroDePontoPage } from './registro-de-ponto';

@NgModule({
  declarations: [
    RegistroDePontoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroDePontoPage),
  ],
})
export class RegistroDePontoPageModule {}
