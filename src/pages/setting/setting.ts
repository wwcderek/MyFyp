import { Component } from '@angular/core';
import { IonicPage, Nav, Events, NavParams, AlertController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from "../../app/services/general.service";
import { UserService } from "../../app/services/user.service";
import { Camera, StatusBar, Keyboard } from 'ionic-native';
import { UserModel } from '../../models/user-model';
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
    public user_id: any;
    public username: string;
    public displayname: string;
    public email: string;
    public iconPath: string;
    public role: string;
    public user: UserModel;
    status: any;
    slideOneForm: FormGroup;  
    submitAttempt: boolean = false;    
    picdata:any;
    picurl:any;
    mypicref:any;
    public keyboard: Keyboard;
   
    
  constructor(public alertCtrl: AlertController, private event: Events, public navParams: NavParams, private storage: Storage, public generalService: GeneralService, public userService: UserService, public formBuilder: FormBuilder, public viewCtrl: ViewController) {
      Keyboard.disableScroll(true);   
      this.status = 0; 
      this.mypicref = firebase.storage().ref('icon/');
      this.getUserInfo();
      this.slideOneForm = formBuilder.group({
        displayname: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(3), Validators.required, Validators.pattern('[0-9]*[a-zA-Z]*[0-9]*')])],
        email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
      });
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
          this.iconPath = response[0].iconPath;
          this.user = new UserModel(response);
          this.event.publish('Info', this.user);
          this.storeUserInfo(this.user);
            this.generalService.alertMessage("Message","Upload Success");
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

  storeUserInfo(info) {
    this.storage.set('user_id', info.user_id);    
    this.storage.set('username', info.username);
    this.storage.set('displayname', info.displayname)
    this.storage.set('email', info.email);
    this.storage.set('role', info.role);
    this.storage.set('iconPath', info.iconPath);
  }


  validate(): boolean {
    if (this.slideOneForm.valid) {
        return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.slideOneForm.controls['displayname'];
    let control2 = this.slideOneForm.controls['email'];
    if (!control.valid) {
        if (control.errors['required']) {
            errorMsg = 'Provide a displayname please';
        } else if (control.errors['minlength']) {
            errorMsg = 'The displayname must have at least 3 characters';
        } else if (control.errors['maxlength']) {
            errorMsg = 'The displayname must less than 15 characters';
        }
    } else if (!control2.valid) {
        if (control2.errors['required']) {
            errorMsg = 'Provide an email please';
        } else if (control2.errors['maxlength']) {
            errorMsg = 'The password must less than 15 characters';
        } else if (control2.errors['pattern']) {
            errorMsg = 'Provide a correct email format';
        }
    } 
    this.generalService.alertMessage("errorMsg",errorMsg);
    return false;
}

 updateProfile(form) {
  let status = this.validate();
  this.submitAttempt = true;

  //   this.signupSlider.slideTo(0);
 if (this.slideOneForm.valid && status) {
    this.userService.updateProfile(this.username, form.value.displayname, form.value.email)
        .map(res => res.json())
        .subscribe(data => {
            if(data) {
              this.displayname = data[0].displayname;
              this.email = data[0].email;
              this.user = new UserModel(data);
              this.event.publish('Info', this.user);
              this.storeUserInfo(this.user);
              this.generalService.alertMessage("Message", "Update profile success");
              this.closeModal();
            } else {
                this.generalService.alertMessage("Error", "Update failed");
            }
        }, error => {
            console.log(error);// Error getting the data
        });
  }
 }

    closeModal() {
        this.viewCtrl.dismiss();
      }

  resetForm() {
    this.displayname = '';
    this.email = '';
  }

}
