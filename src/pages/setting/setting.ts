import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, AlertController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from "../../app/services/general.service";
import { UserService } from "../../app/services/user.service";
import { Camera } from 'ionic-native';
import firebase from 'firebase';
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
    providers: [GeneralService, UserService]
})
export class SettingPage {
    public navCtrl: Nav;
    public date: string;
    public imageName: string;
    public username: string;
    public email: string;
    public role: string;
    picdata:any;
    picurl:any;
    mypicref:any;
  constructor(public alertCtrl: AlertController, public navParams: NavParams, private storage: Storage, public generalService: GeneralService, public userService: UserService) {
      this.mypicref = firebase.storage().ref('icon/');
      this.getUserInfo();
  }

  takepic() {
      Camera.getPicture({
          quality:100,
          destinationType:Camera.DestinationType.DATA_URL,
          sourceType:Camera.PictureSourceType.CAMERA,
          encodingType:Camera.EncodingType.PNG,
          saveToPhotoAlbum:true 
      }).then(imagedata=>{
          this.picdata = imagedata;
          this.upload()
      }) 
  }

  upload() {
      
    this.date = new Date().toISOString();
    this.imageName = this.date+'.png';
      this.mypicref.child("image").child(this.imageName)
      .putString(this.picdata, 'base64',{contentType:'image/png'})
      .then(savepic=>{
          this.picurl=savepic.downloadURL
          this.userService.uploadIcon(this.picurl, this.imageName, this.username).map(res => res.json())
          .subscribe(response => {
         if (response) {
            this.generalService.alertMessage("Message","Upload successfully");
        } else {
          this.generalService.alertMessage("Error","Upload Failed");
        }
          }) 
      })
  }

  uid() { 
      var d = new Date().getTime(); 
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
           var r = (d + Math.random() * 16) % 16 | 0; 
           d = Math.floor(d / 16); 
           return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
         }); 
      return uuid;
  }


  getUserInfo() {
    this.storage.get('username').then((val) => {
        this.username = val;
      });

      this.storage.get('email').then((val) => {
        this.email = val;
      });
      
      this.storage.get('role').then((val) => {
        this.role = val;
      });
  }

  ionViewDidLoad() {
  }

    public setKey() {
        this.storage.set('status', 'Derek');
    }

    public getKey() {
      var num =  this.storage.get('status');
        this.storage.get('username').then((val) => {
            console.log(val);
        });
    }

    public deletekey() {
      this.storage.clear().then((val) => {
      });
    }

}
