import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {
  ImageArray: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ImageArray = [
      {'image':'../../assets/poster/poster1.jpg'},
      {'image':'../../assets/poster/poster3.jpg'},
      {'image':'../../assets/poster/poster4.jpg'},
      {'image':'../../assets/poster/poster6.jpg'}
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPage');
  }

}
