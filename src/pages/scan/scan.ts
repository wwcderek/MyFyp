import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { GeneralService } from "../../app/services/general.service";
import { BarcodeService } from "../../app/services/barcode.service";

/**
 * Generated class for the ScanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
  providers: [QRScanner, BarcodeService, GeneralService]
})
export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public qrScanner: QRScanner, public generalService: GeneralService, public barcodeService: BarcodeService) {
    this.qrscanner();
  }

  ionViewDidLoad() {
  }

  qrscanner() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // alert('authorized');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.generalService.alertMessage('MSG',text);
          // this.barcodeService.scanBarcode
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.navCtrl.pop();
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
          .then((data : QRScannerStatus)=> { 
            // alert(data.showing);
          },err => {
            alert(err);

          });

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });
  }

}
