import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 
/**
 * Generated class for the UploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

}
