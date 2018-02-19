import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventService } from '../../app/services/event.service';
import { GeneralService } from '../../app/services/general.service';
import { EventDetailPage } from '../event-detail/event-detail';
/**
 * Generated class for the EventlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eventlist',
  templateUrl: 'eventlist.html',
  providers: [EventService]
})
export class EventlistPage {
  public events: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService) {
    this.eventList();
  }

  ionViewDidLoad() {
  }

  eventList() {
    this.eventService.getEventlist()
      .subscribe(data => {
        if (data) {
          this.events = data;
        }
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  viewDetail(event) {
    this.navCtrl.push(EventDetailPage, {
      event: event
    });
  }

}
