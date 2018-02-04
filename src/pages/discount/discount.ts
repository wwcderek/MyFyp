import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiscountService } from '../../app/services/discount.service';
import { UserModel } from '../../models/user-model';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DiscountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-discount',
  templateUrl: 'discount.html',
  providers: [DiscountService]
})
export class DiscountPage {
  public user_id: any;
  public username: string;
  public displayname: string;
  public email: string;
  public iconPath: string;
  public role: string;
  public user: UserModel;
  public discounts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public discountService: DiscountService, private storage: Storage) {
    this.getUserInfo();
  }

  ionViewDidLoad() {
  }


  getDiscount() {
    this.getUserInfo();
    this.discountService.getDiscount(this.user_id).subscribe(response => {
      this.discounts = response;
    }, error => {
        console.log(error);
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
