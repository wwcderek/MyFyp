import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralService } from '../../app/services/general.service';
import { EventService } from '../../app/services/event.service';
import { UserModel } from '../../models/user-model';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';
/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
  providers: [EventService]
})
export class EventDetailPage {
  public event: any;
  public detail: any;
  public user_id: any;
  public username: string;
  public displayname: string;
  public email: string;
  public iconPath: string;
  public role: string;
  public user: UserModel;
  public userlist: any;
  public status: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService, private storage: Storage, public generalService: GeneralService) {
    this.event = navParams.get('event');
    this.getUserInfo();
    this.getDetail();
    this.eventUser();
  }

  ionViewDidLoad() {
  }

  getDetail() {
    this.eventService.getDetail(this.event.event_id)
      .subscribe(data => {
        if (data) {
          this.detail = data;
        }
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  getUserStatus(user_id) {
    this.eventService.getStatus(user_id, this.event.event_id)
      .subscribe(data => {
        this.status = data;
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  joinEvent() {
    this.eventService.joinEvent(this.user_id, this.event.event_id)
      .subscribe(data => {
        if (data) {
          this.generalService.alertMessage('MSG', 'JOIN EVENT SUCCESSFULLY !');
          this.status = 1;
          this.eventUser();
        } else {
          this.generalService.alertMessage('MSG', 'JOIN EVENT FAILED !');
        }
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  leaveEvent() {
    this.eventService.leaveEvent(this.user_id, this.event.event_id)
      .subscribe(data => {
        if (data) {
          this.status = 2;
          this.eventUser();
        } else {
          this.generalService.alertMessage('MSG', 'Error Occur!');
        }
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  eventUser() {
    this.eventService.eventUser(this.event.event_id)
      .subscribe(data => {
        console.log(data);
        if (data)
          this.userlist = data;
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  getUserInfo() {
    this.storage.get('user_id').then((val) => {
      this.getUserStatus(val);
      this.user_id = val;
    });

    this.storage.get('displayname').then((val) => {
      this.displayname = val;
    });
  }

  chat() {
    this.navCtrl.push(ChatPage, {
      event_id: this.event.event_id,
      username: this.displayname
    });
  }

}
