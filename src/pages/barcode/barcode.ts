import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams } from 'ionic-angular';
import { UserModel } from '../../models/user-model';
// import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BarcodeService } from "../../app/services/barcode.service";
import { Storage } from '@ionic/storage';
import { GeneralService } from "../../app/services/general.service";

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
 public user_id: any;
 public username: string;
 public displayname: string;
 public email: string;
 public iconPath: string;
 public role: string;
 public user: UserModel;
 public navCtrl: Nav;
  constructor(public navParams: NavParams, public barcodeService: BarcodeService, private storage: Storage, public generalService: GeneralService) {
    this.getUserInfo();    
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad BarcodePage');
  }

  createCode()
  {
    this.barcodeService.createCode(this.qrData, this.user_id).subscribe(response => {
    if(response){
      this.generalService.alertMessage("MSG", "Create successfully!");
    }else{
      this.generalService.alertMessage("MSG", "Record not exist!!");
    }
  
      //  this.showCode(this.qrData);
    }, error => {
        console.log(error);
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
     this.barcodeService.showCode(data).subscribe(response => {
         console.log(response.path);
         this.createdCode = response.path;
     })
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

//   scanCode()
//   {
//     this.barcodeScanner.scan().then(barcodeData => {
//       this.scannedCode = barcodeData.text;
//     })
//   }
}
