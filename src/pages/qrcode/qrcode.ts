import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the QrcodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
public qrCode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(navParams.get('code'));
    this.qrCode = navParams.get('code');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
