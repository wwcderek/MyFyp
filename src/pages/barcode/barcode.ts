import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController } from 'ionic-angular';
import { UserModel } from '../../models/user-model';
import { BarcodeService } from "../../app/services/barcode.service";
import { Storage } from '@ionic/storage';
import { GeneralService } from "../../app/services/general.service";
import { QrcodePage } from "../qrcode/qrcode"; 
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
 public user_id: any;
 public username: string;
 public displayname: string;
 public email: string;
 public iconPath: string;
 public role: string;
 public user: UserModel;
 public qrCode: any;
 public navCtrl: Nav;
 public codeList: any;
  constructor(public navParams: NavParams, public barcodeService: BarcodeService, private storage: Storage, public generalService: GeneralService, public modalCtrl: ModalController) {
    this.getUserInfo();    
  }

  ionViewDidLoad()
  {
  }

  createCode()
  {
    this.barcodeService.createCode(this.qrData, this.user_id).subscribe(response => {
    if(response){
      this.codeList = null;
      this.qrCode = response;
      this.generalService.alertMessage("MSG", "Create successfully!");
    }else{
      this.generalService.alertMessage("MSG", "Record not exist!!");
    }  
  }, error => {
      console.log(error);
    });
  }

  getCode()
  {
          this.barcodeService.getBarcode(this.user_id).subscribe(response => {
            this.qrCode = null;
              this.codeList = response;
          })
  }


  showCode(code) {
    let modal = this.modalCtrl.create(QrcodePage, {code: code});
    modal.present();
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
