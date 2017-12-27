import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountPage } from './discount';

@NgModule({
  declarations: [
    DiscountPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountPage),
  ],
  exports: [
    DiscountPage
  ]
})
export class DiscountPageModule {}
