import { Injectable } from '@angular/core';
import { Nav, AlertController } from 'ionic-angular';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Headers,Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class GeneralService {
    http: any;
public navCtrl: Nav;
    constructor(public alertCtrl: AlertController, http: Http) {
        this.http = http;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({headers: headers});
    }


    alertMessage(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    sendNotification() {
        let body = {
            "notification":{
              "title":"New Notification",
              "body":"New Discount Is Received",
              "sound":"default",
              "click_action":"FCM_PLUGIN_ACTIVITY",
              "icon":"fcm_push_icon"
            },
            "data":{
              "param1":"value1",
              "param2":"value2"
            },
              "to":"/topics/all",
              "priority":"high",
              "restricted_package_name":""
          }
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', 'key=AAAADIVSg6Q:APA91bFG2lFHoIz6JWhDyxeT0Ifd3aWBSKL7TCuc5YheFLID6JDdipn77c8lcIfSLHZRvP7S_3WUAe54to_pBiW4r3r4VdTCojLQr6YdceUkiXf0f0BuYCEXmzsmmIXhS7sKHgOBHMCP');
          this.http.post("https://fcm.googleapis.com/fcm/send", JSON.stringify(body), {headers:headers})
          .subscribe(response => {
            console.log(response)
          }, error => {
              console.log(error);
            });

          
    }

    testing2() {
        console.log("can you see");
         let headers = new Headers();
         headers.append('Content-Type', 'application/json');
         headers.append('Authorization', 'key=AAAADIVSg6Q:APA91bFG2lFHoIz6JWhDyxeT0Ifd3aWBSKL7TCuc5YheFLID6JDdipn77c8lcIfSLHZRvP7S_3WUAe54to_pBiW4r3r4VdTCojLQr6YdceUkiXf0f0BuYCEXmzsmmIXhS7sKHgOBHMCP');


         let body = {
             message: "DO you hear me?",
             username: "derek"
         };

        this.http.post('http://127.0.0.1:8000/test2', JSON.stringify(body), {headers:headers})
            .map(res => res.json())
            .subscribe(data => {
                console.log(data);
            });
    }
}