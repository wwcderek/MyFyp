import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BarcodeService } from "../../app/services/barcode.service";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the BarcodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
    providers: [BarcodeService]
})
export class BarcodePage
{
 qrData = null;
 createdCode: any;
 scannedCode = null;
 paths:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public barcodeService: BarcodeService, private storage: Storage) {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad BarcodePage');
  }

  createCode()
  {
      this.storage.get('name').then((val) => {
    this.barcodeService.createBarcode(this.qrData, val.accountID).subscribe(response => {
     console.log("run success");
     this.showCode(this.qrData);
    }, error => {
        console.log(error);
    });
      });

  }

  getCode()
  {
      console.log(123);
      this.storage.get('name').then((val) => {
          this.barcodeService.getBarcode(val.accountID).subscribe(response => {
              console.log(response);
              this.paths = response;
              this.createdCode = null;
             // this.createdCode = response.path;
          })
      });

  }

  showCode(data)
  {
     this.barcodeService.showBarcode(data).subscribe(response => {
         console.log(response.path);
         this.createdCode = response.path;
     })
  }

  scanCode()
  {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }
}
