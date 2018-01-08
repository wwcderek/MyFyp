import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams } from 'ionic-angular';
import { ReviewPage } from '../review/review';
import { GeneralService } from "../../app/services/general.service";
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
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
  providers: [GeneralService]
  
})
export class DetailPage {
  film: any;
  public navCtrl: Nav;
  tab1: any;
  tab2: any;
  constructor(public nav: Nav, public navParams: NavParams, public generalService: GeneralService, private storage: Storage) {
    this.film = navParams.get('film');
    this.tab1 = ReviewPage;
    this.tab2 = this;
  }

  ionViewDidLoad() {
  }

  review(film) {
    this.storage.get('username').then(data=>
      {
        if(data) {
          this.nav.push(ReviewPage, {
            film: film
          });
        } else {
          this.nav.push(LoginPage, {
          });
        }
      })
  }

  test() {
    this.generalService.alertMessage("MSG",'SEE');
  }

}
