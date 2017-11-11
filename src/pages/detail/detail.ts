import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  film: any;
  public navCtrl: Nav;
  constructor(public navParams: NavParams) {
    this.film = navParams.get('film');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
