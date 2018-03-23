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
import { QrcodePage } from "../pages/qrcode/qrcode";
import { ContentPage } from '../pages/content/content';
import { SettingPage } from "../pages/setting/setting";
import { DiscountPage } from '../pages/discount/discount';
import { ReviewPage } from '../pages/review/review';
import { ReviewListPage } from '../pages/review-list/review-list';
import { RegistrationPage } from '../pages/registration/registration';
import { PlaylistPage } from '../pages/playlist/playlist';
import { ScanPage } from '../pages/scan/scan';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { EventPage } from '../pages/event/event';
import { EventlistPage } from '../pages/eventlist/eventlist';
import { ChatPage } from '../pages/chat/chat';
import { CreateeventPage } from '../pages/createevent/createevent';
import { AnalysisPage } from '../pages/analysis/analysis';
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
import { RatingComponent } from '../components/rating/rating';
import { FCM } from '@ionic-native/fcm';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2';
import { ChartsModule } from 'ng2-charts';


var config = {
  apiKey: "AIzaSyBHl0ZfTGnsRUemk530tRTCaMfGz6jSHZg",
  authDomain: "facebooklogin-67539.firebaseapp.com",
  databaseURL: "https://facebooklogin-67539.firebaseio.com",
  projectId: "facebooklogin-67539",
  storageBucket: "facebooklogin-67539.appspot.com",
  messagingSenderId: "53776384932"
};

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
      QrcodePage,
      SettingPage,
      DiscountPage,
      PlaylistPage,
      ContentPage,
      ReviewPage,
      ReviewListPage,
      ScanPage,
      EventPage,
      EventlistPage,
      CreateeventPage,
      EventDetailPage,
      ChatPage,
      AnalysisPage,
    UserComponent,
    RatingComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot(),
    HttpModule,
      NgxQRCodeModule,
      ChartsModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    DetailPage,
      BarcodePage,
      QrcodePage,
      SettingPage,
      ContentPage,
      DiscountPage,
      PlaylistPage,
      ReviewPage,
      ReviewListPage,
      ScanPage,
      EventPage,
      EventlistPage,
      CreateeventPage,
      EventDetailPage,
      ChatPage,
      AnalysisPage
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
    YoutubeProvider,
    FCM,
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
