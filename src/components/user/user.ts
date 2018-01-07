import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  text: string;
  username: string;
  displayname: string;
  iconPath: string;

  constructor(private event: Events) {
    this.event.subscribe("Info", (data) => {
        this.iconPath = data.iconPath;
        this.username = data.username;
        this.displayname = data.displayname;
    })
  
  
  }

}
