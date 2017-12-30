import { BrowserModule } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Nav } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DetailPage } from '../pages/detail/detail';
import { BarcodePage } from "../pages/barcode/barcode";
import { ContentPage } from '../pages/content/content';
import { SettingPage } from "../pages/setting/setting";
import { UploadPage } from '../pages/upload/upload';
import { DiscountPage } from '../pages/discount/discount';
import { RegistrationPage } from '../pages/registration/registration';
import { PlaylistPage } from '../pages/playlist/playlist';
import { HttpModule} from '@angular/http';
import { NgxQRCodeModule } from "ngx-qrcode2";
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { AccountService } from './services/account.service';
import { UserService } from './services/user.service';
import { GeneralService } from './services/general.service';
import { UserComponent } from '../components/user/user';
import { YoutubeProvider } from '../providers/youtube/youtube';


firebase.initializeApp({
    apiKey: "AIzaSyBHl0ZfTGnsRUemk530tRTCaMfGz6jSHZg",
    authDomain: "facebooklogin-67539.firebaseapp.com",
    databaseURL: "https://facebooklogin-67539.firebaseio.com",
    projectId: "facebooklogin-67539",
    storageBucket: "facebooklogin-67539.appspot.com",
    messagingSenderId: "53776384932"
});

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    DetailPage,
      BarcodePage,
      SettingPage,
      UploadPage,
      DiscountPage,
      PlaylistPage,
      ContentPage,
    UserComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot(),
    HttpModule,
      NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    DetailPage,
      BarcodePage,
      SettingPage,
      UploadPage,
      ContentPage,
      DiscountPage,
      PlaylistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      Facebook,
      AccountService,
      UserService,
      GeneralService,
      Nav,
    YoutubeProvider
  ]
})
@Component({
  templateUrl: 'app.html'
})
@Component({
  //templateUrl: 'app.html',
   template: '<ion-nav #myNav [root]="rootPage"></ion-nav>',
})
export class AppModule {
  @ViewChild('content') nav: Nav;
}
