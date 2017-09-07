import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SettingPage } from "../pages/setting/setting";
import { BarcodePage } from '../pages/barcode/barcode';
import { AccountService } from './services/account.service';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
@Component({
  //templateUrl: 'app.html',
   template: '<ion-nav #myNav [root]="rootPage"></ion-nav>',
   providers: [AccountService]
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  //@ViewChild('myNav') nav: NavController
  loginPages: Array<{title: string, icon: string, component: any}>;
  logoutPages: Array<{title: string, icon: string, component: any}>;
  icon: any;
  activePage: any;
  rootPage: any = HomePage;
  loader = true;






    constructor(public platform:Platform, public storage: Storage, public menuCtrl: MenuController, public accountService: AccountService) {
    this.initializeApp();
              this.loginPages = [
                  {title:'Home', icon:'home', component: HomePage},
                  {title:'Login', icon:'contact', component: LoginPage},
                  {title:'Setting', icon:'settings', component: SettingPage}
              ];
                this.logoutPages = [
                    {title:'Home', icon:'home', component: HomePage},
                    {title:'QR Code', icon:'qr-scanner', component: BarcodePage},
                    {title:'Setting', icon:'settings', component: SettingPage},
                    {title:'Logout', icon:'exit', component: HomePage},
                ];
          this.icon = [
              {item:'home'},
              {item:'person'}
          ];
          this.activePage = this.loginPages[0];
          this.enableAuthenticatedMenu();
  }

   load(){
   }

   initializeApp(){
     this.platform.ready().then(() => {
      //  StatusBar.styleDefault();
      //  SplashScreen.hide();
     });
   }

    enableAuthenticatedMenu() {
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(false, 'unauthenticated');
    }



   openPage(page){
       if(page.title==="Logout"){
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

   login() {
       this.nav.setRoot(LoginPage);
       this.activePage = LoginPage;
   }

   checkActive(page){
       return page == this.activePage;
   }
}

