import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [AngularFireDatabase]
})
export class ChatPage {
  public username: string = '';
  public message: string = '';
  public path: string = '';
  public _chatSubscription;
  public messages: object[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.username = navParams.get('username');
    this.path = '/' + navParams.get('event_id');
    this._chatSubscription = this.db.list(this.path).valueChanges().subscribe(data => {
      this.messages = data;
      // data.map(elem => {
      //   this.messages.push(elem);
      // })
    });

  }

  ionViewDidLoad() {
    this.db.list(this.path).push({
      specialMessage: true,
      message: this.username + ' has joined the room'
    })
  }

  ionViewWillLeave() {
    this._chatSubscription.unsubscribe();
    this.db.list(this.path).push({
      specialMessage: true,
      message: this.username + ' has left the room'
    })
  }

  sendMessage() {
    this.db.list(this.path).push({
      username: this.username,
      message: this.message
    }).then(() => {

    })
    this.message = '';
  }

}
