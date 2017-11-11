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

    testing() {
        // console.log("hi you");
        let data: any;
        data = ['one', 'me','you','she','they'];
        return this.http.get("http://127.0.0.1:8000/wong/"+ data)
            .map(res => res.json());
        // var amount = 100;
       // console.log("can you see");

        // let postParams = {
        //     user_name: "username",
        //     password: "password"
        // }
        // var headers = new Headers();
        // headers.append("Accept", 'application/json');
        // headers.append('Content-Type', 'application/json');
        // let options = new RequestOptions({headers: headers});
        //
        // return this.http.post('http://127.0.0.1:8000/', postParams, options)
        //     .map((res: Response) => res.json());


    }


    testing2() {
        console.log("can you see");
         let headers = new Headers();
         headers.append('Content-Type', 'application/json');

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