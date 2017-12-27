import { Component } from '@angular/core';
import { IonicPage, Nav, Events, ModalController, AlertController, Platform, MenuController, NavController} from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { AccountService } from '../../app/services/account.service';
import { GeneralService } from "../../app/services/general.service";
import { PermissionService } from "../../app/services/permission.service";
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import {StatusBar, Keyboard} from 'ionic-native';
import { UserModel } from '../../models/user-model';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AccountService, GeneralService, PermissionService]
})
export class LoginPage {
  public username: any;
  public email: any;
  public iconPath: any;
  public user: UserModel;
  http: any;
  public keyboard: Keyboard;
  constructor(private event: Events, public alertCtrl: AlertController, public modalCtrl: ModalController, public accountService: AccountService, public generalService: GeneralService, public permissionService: PermissionService, public facebook: Facebook, private storage: Storage, public menuCtrl: MenuController, public navCtrl: NavController) {
    Keyboard.disableScroll(true);
  }

  ionViewDidLoad() {
  }


    disableAuthenticatedMenu() {
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
    }

  loginClick(form) {
    if (form.value !== undefined) {
      this.accountService.login(form.value.username, form.value.password).map(res => res.json())
          .subscribe(response => {
         if (response!=false) {
            this.user = new UserModel(response);
            this.event.publish('Info', this.user);
            this.storeUserInfo(this.user);
            this.disableAuthenticatedMenu();
            this.navCtrl.push(HomePage);
            this.navCtrl.setRoot(HomePage);
        } else if (!form.value || !response) {
          this.generalService.alertMessage("Error","Username or password is incorrected");
        }
      })
    } else {
      this.generalService.alertMessage("Try Again","Please fill in all necessary information");
    }
  }

  storeUserInfo(info) {
    this.storage.set('username', info.username);
    this.storage.set('email', info.email);
    this.storage.set('role', info.role);
    this.storage.set('iconPath', info.iconPath);
  }


  getInfo() {
    var user = firebase.auth().currentUser;
    if (user != null) {
        this.username = user.displayName;
        this.email =  user.email;
        this.iconPath = user.photoURL;
        // emailVerified = user.emailVerified;
        // uid = user.uid; 
    }
}
  

  /**
     *  For ios native fb login rather than through browser
     */
  facebookLogin(): Promise<any> {
      return this.facebook.login(['email'])
          .then( response => {
              const facebookCredential = firebase.auth.FacebookAuthProvider
                  .credential(response.authResponse.accessToken);
              firebase.auth().signInWithCredential(facebookCredential)
                  .then( success => {
                      this.getInfo();
                      this.accountService.fbLogin(this.username, this.iconPath).map(res => res.json())
                      .subscribe(result => {
                        this.user = new UserModel(result);
                        this.storeUserInfo(this.user);
                        this.event.publish('Info', this.user);
                        this.disableAuthenticatedMenu();
                        this.navCtrl.push(HomePage);
                        this.navCtrl.setRoot(HomePage);
                  })
                      this.disableAuthenticatedMenu();
                      this.navCtrl.push(HomePage);
                      this.navCtrl.setRoot(HomePage);
                     
                  });

          }).catch((error) => { console.log(error) });
  }

  registration() {
    let modal = this.modalCtrl.create(RegistrationPage);
    modal.present();
  }

    /**
     * For website
     */
  // fbLogin() {
  //   let provider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithRedirect(provider).then(() => {
  //     firebase.auth().getRedirectResult().then((result) => {
  //        this.generalService.alertMessage("User Info",JSON.stringify(result));
  //        //console.log('success login');
  //        //console.log(JSON.stringify(result));
  //     }).catch(function (error) {
  //       alert(JSON.stringify(error))

  //     });
  //   })
  // }

   //get user information, after user use fb login
 





}
