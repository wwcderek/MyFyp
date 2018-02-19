import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateeventPage } from '../createevent/createevent';
import { EventlistPage } from '../eventlist/eventlist';
/**
 * Generated class for the EventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  viewPage() {
    this.navCtrl.push(CreateeventPage, {
    });
  }

  viewList() {
    this.navCtrl.push(EventlistPage, {
    });
  }

}
