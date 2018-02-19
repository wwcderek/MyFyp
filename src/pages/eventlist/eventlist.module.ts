import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventlistPage } from './eventlist';

@NgModule({
  declarations: [
    EventlistPage,
  ],
  imports: [
    IonicPageModule.forChild(EventlistPage),
  ],
  exports: [
    EventlistPage
  ]
})
export class EventlistPageModule {}
