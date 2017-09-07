import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, Platform, MenuController} from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { AccountService } from '../../app/services/account.service';
import { GeneralService } from "../../app/services/general.service";
import { PermissionService } from "../../app/services/permission.service";
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

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
  http: any;
  data: any;
  result: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, public accountService: AccountService, public generalService: GeneralService, public permissionService: PermissionService, public facebook: Facebook, private storage: Storage, public menuCtrl: MenuController) {
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
         if (response) {
           // this.permissionService.attachPermission(response);
            this.disableAuthenticatedMenu();
            this.navCtrl.push(HomePage);
            this.navCtrl.setRoot(HomePage);
        } else if (form.value && !response) {
          this.generalService.alertMessage("Error","Username or password is incorrated");
        }
      })
    } else {
      this.generalService.alertMessage("Try Again","Please fill in all necessary information");
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
                      this.disableAuthenticatedMenu();
                      this.navCtrl.push(HomePage);
                      this.navCtrl.setRoot(HomePage);
                      //console.log("Firebase success: " + JSON.stringify(success));
                  });

          }).catch((error) => { console.log(error) });
  }

    /**
     * For website
     */
  fbLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
         this.generalService.alertMessage("User Info",JSON.stringify(result));
         //console.log('success login');
         //console.log(JSON.stringify(result));
      }).catch(function (error) {
        alert(JSON.stringify(error))

      });
    })
  }
   //get user information, after user use fb login
  getInfo() {
      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
      }
  }

  registration() {
    let modal = this.modalCtrl.create(RegistrationPage);
    modal.present();
  }





}
