import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform, MenuController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SettingPage } from "../pages/setting/setting";
import { BarcodePage } from '../pages/barcode/barcode';
import { DiscountPage } from '../pages/discount/discount';
import { ChatPage } from '../pages/chat/chat';
import { ScanPage } from '../pages/scan/scan';
import { EventPage } from '../pages/event/event';
import { ContentPage } from '../pages/content/content';
import { AccountService } from './services/account.service';
import { GeneralService } from './services/general.service';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';

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
  loginPages: Array<{ title: string, icon: string, component: any }>;
  logoutPages: Array<{ title: string, icon: string, component: any }>;
  icon: any;
  activePage: any;
  rootPage: any = HomePage;
  loader = true;
  public user_id: any;
  public username: any;
  public displayname: any;
  public email: any;
  public iconPath: any;
  public role: any;
  constructor(public platform: Platform, private event: Events, public storage: Storage, public menuCtrl: MenuController, public accountService: AccountService, public generalService: GeneralService, public modalCtrl: ModalController, public statusBar: StatusBar, public splashScreen: SplashScreen, private fcm: FCM) {
    this.initializeApp();
    this.loginPages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Film', icon: 'film', component: ContentPage },
      { title: 'Login', icon: 'contact', component: LoginPage },
      { title: 'Event', icon: 'calendar', component: EventPage },
      { title: 'Chat', icon: 'calendar', component: ChatPage },
    ];
    this.logoutPages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Film', icon: 'film', component: ContentPage },
      { title: 'QR Code', icon: 'qr-scanner', component: BarcodePage },
      { title: 'Scan', icon: 'settings', component: ScanPage },
      { title: 'Discount', icon: 'settings', component: DiscountPage },
      { title: 'Event', icon: 'calendar', component: EventPage },
      { title: 'Logout', icon: 'exit', component: HomePage }
    ];
    this.icon = [
      { item: 'home' },
      { item: 'person' }
    ];
    this.activePage = this.loginPages[0];
    this.enableAuthenticatedMenu();
  }

  ionViewDidLoad() {
    this.getUserInfo();
  }

  initializeApp() {
    if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
      this.platform.ready().then(() => {
        this.fcm.subscribeToTopic('all');
        this.fcm.getToken().then(token => {
          console.log(token);
        })
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        })
        this.fcm.onTokenRefresh().subscribe(token => {
          console.log(token);
        });
        //end notifications.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  }

  enableAuthenticatedMenu() {
    this.menuCtrl.enable(true, 'authenticated');
    this.menuCtrl.enable(false, 'unauthenticated');
  }

  openPage(page) {
    if (page.title === "Logout") {
      this.deleteUserInfo();
      this.enableAuthenticatedMenu();
      this.accountService.logout();
      this.storage.clear().then((val) => {
      });
      this.nav.setRoot(page.component);
      this.activePage = page;
    } else {
      this.nav.setRoot(page.component);
      this.activePage = page;
    }
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

    this.storage.get('role').then((val) => {
      this.role = val;
    });

    this.storage.get('iconPath').then((val) => {
      this.iconPath = val;
    });
  }

  deleteUserInfo() {
    this.storage.remove('user_id')
    this.storage.remove('username');
    this.storage.remove('displayname');
    this.storage.remove('email');
    this.storage.remove('iconPath');
    this.storage.remove('role');
    this.iconPath = "assets/header.jpg";
  }

  login() {
    this.nav.setRoot(LoginPage);
    this.activePage = LoginPage;
  }

  checkActive(page) {
    return page == this.activePage;
  }

  userSetting() {
    let modal = this.modalCtrl.create(SettingPage);
    modal.present();
  }
}

