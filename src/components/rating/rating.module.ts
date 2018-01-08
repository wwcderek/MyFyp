import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatingComponent } from './rating';

@NgModule({
  declarations: [
    RatingComponent,
  ],
  imports: [
    IonicPageModule.forChild(RatingComponent),
  ],
  exports: [
    RatingComponent
  ]
})
export class RatingComponentModule {}
