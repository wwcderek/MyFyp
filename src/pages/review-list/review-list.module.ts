import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewListPage } from './review-list';

@NgModule({
  declarations: [
    ReviewListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewListPage),
  ],
  exports: [
    ReviewListPage
  ]
})
export class ReviewListPageModule {}
