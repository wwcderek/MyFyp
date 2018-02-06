import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { GeneralService } from "../../app/services/general.service";
import { BarcodeService } from "../../app/services/barcode.service";
import { UserModel } from '../../models/user-model';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';

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

 public user_id: any;
 public username: string;
 public displayname: string;
 public email: string;
 public iconPath: string;
 public role: string;
 public user: UserModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public qrScanner: QRScanner, public generalService: GeneralService, public barcodeService: BarcodeService, private storage: Storage) {
    this.getUserInfo();    
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
          this.barcodeService.scanBarcode(text, this.user_id).subscribe(response => {
            switch(response) {
              case 0:
                    this.generalService.alertMessage("MSG", "Invalid QR Code");
                    break;
              case 1:
                    this.generalService.sendNotification();
                    this.generalService.alertMessage("MSG", "Discount Is Given");
                    break;
              case 2:
                    this.generalService.alertMessage("MSG", "No Discount Is Given");
                    break;
              case 3:
                    this.generalService.alertMessage("MSG", "Time Extended");
                    break;                  
              default:
                    this.generalService.alertMessage("MSG", "Invalid QR Code");
                    break;
              }
          }, error => {
              console.log(error);
            });

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            // this.navCtrl.pop();
            this.navCtrl.setRoot(HomePage);
            this.navCtrl.popToRoot()
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


  getUserInfo() {
    this.storage.get('user_id').then((val) => {
        this.user_id = val;
      });

    this.storage.get('username').then((val) => {
        this.username = val;
      });

      this.storage.get('displayname').then((val) => {
        this.displayname = val;
      });

      this.storage.get('email').then((val) => {
        this.email = val;
      });

      this.storage.get('iconPath').then((val) => {
        this.iconPath = val;
      });
      
      this.storage.get('role').then((val) => {
        this.role = val;
      });
  }

}
