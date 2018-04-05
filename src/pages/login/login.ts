import { Component } from '@angular/core';
import { IonicPage, Nav, Events, ModalController, AlertController, Platform, MenuController, NavController, LoadingController} from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { RecommendationPage } from '../recommendation/recommendation';
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
  public user_id: any;
  public username: any;
  public email: any;
  public iconPath: any;
  public user: UserModel;
  public fbUserId: any;
  http: any;
  public keyboard: Keyboard;
  constructor(private event: Events, public alertCtrl: AlertController, public modalCtrl: ModalController, public accountService: AccountService, public generalService: GeneralService, public permissionService: PermissionService, public facebook: Facebook, private storage: Storage, public menuCtrl: MenuController, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    Keyboard.disableScroll(true);
  }

  ionViewDidLoad() {
  }


    disableAuthenticatedMenu() {
      this.menuCtrl.enable(false, 'authenticated');
      if(this.user.role=='staff') {
      this.menuCtrl.enable(true, 'staff');
      this.menuCtrl.enable(false, 'unauthenticated');
      } else {
      this.menuCtrl.enable(false, 'staff');
      this.menuCtrl.enable(true, 'unauthenticated');
      }
    }

  loginClick(form) {
    if (form.value !== undefined) {
      this.accountService.login(form.value.username, form.value.password).map(res => res.json())
          .subscribe(response => {
         if (response!=false) {
            this.presentLoading();
            this.user = new UserModel(response);
            this.event.publish('Info', this.user);
            this.storeUserInfo(this.user);
            this.disableAuthenticatedMenu();
            this.navCtrl.push(HomePage);
            this.navCtrl.setRoot(HomePage);
            this.recommendation();
        } else if (!form.value || !response) {
          this.generalService.alertMessage("Error","Username or Password Is Incorrected");
        }
      })
    } else {
      this.generalService.alertMessage("Try Again","Please Fill In All Necessary Information");
    }
  }

  storeUserInfo(info) {
    this.storage.set('user_id', info.user_id);    
    this.storage.set('username', info.username);
    this.storage.set('displayname', info.displayname)
    this.storage.set('email', info.email);
    this.storage.set('role', info.role);
    this.storage.set('iconPath', info.iconPath);
  }


  getInfo() {
    var user = firebase.auth().currentUser;
    if (user != null) {
        this.username = user.displayName;
        this.email =  user.email;
        this.iconPath = "http://101.78.175.101:6780/storage/2018-01-06-15-02-53.png";
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
                      this.accountService.fbLogin(this.username, this.email, this.iconPath).map(res => res.json())
                      .subscribe(result => {
                        this.presentLoading();
                        this.user = new UserModel(result);
                        this.event.publish('Info', this.user);
                        this.storeUserInfo(this.user);
                        this.disableAuthenticatedMenu();
                        this.navCtrl.push(HomePage);
                        this.navCtrl.setRoot(HomePage);
                        this.recommendation();
                  })
                      // this.disableAuthenticatedMenu();
                      // this.navCtrl.push(HomePage);
                      // this.navCtrl.setRoot(HomePage);
                     
                  });

          }).catch((error) => { console.log(error) });
  }

  registration() {
    let modal = this.modalCtrl.create(RegistrationPage);
    modal.present();
  }

  recommendation() {
    let modal = this.modalCtrl.create(RecommendationPage);
    modal.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
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
