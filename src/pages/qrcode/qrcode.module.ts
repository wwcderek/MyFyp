import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodePage } from './qrcode';

@NgModule({
  declarations: [
    QrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodePage),
  ],
  exports: [
    QrcodePage
  ]
})
export class QrcodePageModule {}
