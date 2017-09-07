import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DetailPage } from '../pages/detail/detail';
import { BarcodePage } from "../pages/barcode/barcode";
import { SettingPage } from "../pages/setting/setting";
import { RegistrationPage } from '../pages/registration/registration';
import { HttpModule} from '@angular/http';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';


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
      SettingPage
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
      SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      BarcodeScanner,
      Facebook
  ]
})
export class AppModule {}
