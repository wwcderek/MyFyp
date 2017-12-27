import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SettingPage } from "../pages/setting/setting";
import { BarcodePage } from '../pages/barcode/barcode';
import { UploadPage } from '../pages/upload/upload';
import { DiscountPage } from '../pages/discount/discount';
import { AccountService } from './services/account.service';
import { GeneralService } from './services/general.service';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
@Component({
  //templateUrl: 'app.html',
   template: '<ion-nav #myNav [root]="rootPage"></ion-nav>',
   providers: [AccountService, GeneralService]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
  //@ViewChild('myNav') nav: NavController
  loginPages: Array<{title: string, icon: string, component: any}>;
  logoutPages: Array<{title: string, icon: string, component: any}>;
  icon: any;
  activePage: any;
  rootPage: any = HomePage;
  loader = true;
  public username: any;
  public email: any;
  public iconPath: any;
  public role: any;
    constructor(public platform:Platform, private event: Events, public storage: Storage, public menuCtrl: MenuController, public accountService: AccountService, public generalService: GeneralService) {
    this.initializeApp();
              this.loginPages = [
                  {title:'Home', icon:'home', component: HomePage},
                  {title:'Login', icon:'contact', component: LoginPage},
                  {title:'Setting', icon:'settings', component: SettingPage},
                  {title:'Upload', icon:'settings', component: UploadPage},
                  {title:'Discount', icon:'settings', component: DiscountPage}
              ];
                this.logoutPages = [
                    {title:'Home', icon:'home', component: HomePage},
                    {title:'QR Code', icon:'qr-scanner', component: BarcodePage},
                    {title:'Setting', icon:'settings', component: SettingPage},
                    {title:'Logout', icon:'exit', component: HomePage},
                    {title:'Discount', icon:'settings', component: DiscountPage}
                ];
          this.icon = [
              {item:'home'},
              {item:'person'}
          ];
          this.activePage = this.loginPages[0];
          this.enableAuthenticatedMenu();
  }

  ionViewDidLoad(){
    this.getUserInfo();
    this.generalService.alertMessage("Message", "get user info");
  }

   initializeApp(){
     this.platform.ready().then(() => {
     });
   }

    enableAuthenticatedMenu() {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
    }

   openPage(page){
       if(page.title==="Logout"){
           this.deleteUserInfo();
           this.enableAuthenticatedMenu();
           this.accountService.logout();
           this.storage.clear().then((val) => {
           });
           this.nav.setRoot(page.component);
           this.activePage = page;
       }else {
           this.nav.setRoot(page.component);
           this.activePage = page;
       }
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

      this.storage.get('iconPath').then((val) => {
        this.iconPath = val;
      });
   }

   deleteUserInfo(){
    this.storage.remove('username');
    this.storage.remove('email');
    this.storage.remove('iconPath');
    this.storage.remove('role');
    this.iconPath = "assets/header.jpg";
   }

   login() {
       this.nav.setRoot(LoginPage);
       this.activePage = LoginPage;
   }

   checkActive(page){
       return page == this.activePage;
   }
}

