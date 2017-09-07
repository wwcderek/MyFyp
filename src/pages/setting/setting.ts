import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from "../../app/services/general.service";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova:any;
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
    providers: [GeneralService]
})
export class SettingPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private storage: Storage, public generalService: GeneralService) {
      // var ss = new cordova.plugins.SecureStorage(
      //     function () { this.alertMessage('Success')},
      //     function (error) { console.log('Error ' + error); },
      //     'my_app');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

    alertMessage(message) {
        let alert = this.alertCtrl.create({
            title: 'WARNING',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    public setKey() {
        this.storage.set('status', 'Derek');
    }

    public getKey() {
      var num =  this.storage.get('status');
        this.storage.get('status').then((val) => {
            console.log(val);
        });
    }

    public deletekey() {
      this.storage.clear().then((val) => {
          this.alertMessage('clear already');
      });
    }

    public number() {
        this.generalService.testing().subscribe(response => {
            console.log(response);
        })
        }

    public test() {
        this.generalService.testing2()
    }


}
