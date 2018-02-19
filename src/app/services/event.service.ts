import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class EventService {
    http: any;
    headers: any;
    public navCtrl: Nav;
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    createEvent(user_id, title, description, filmId, startDate, time) {
        let body = {
            user_id: user_id,
            title: title,
            description: description,
            filmId: filmId,
            startDate: startDate,
            time: time,
        };
        console.log(startDate);
        console.log(time);
        return this.http.post("http://101.78.175.101:6780/createEvent", JSON.stringify(body), {headers:this.headers})
            .map(res => res.json());
    }

    getEventlist() {
        return this.http.get("http://101.78.175.101:6780/showEvent")
        .map(res => res.json());
    }

   getStatus(user_id, event_id) {
    let body = {
        user_id: user_id,
        event_id: event_id
    }
    return this.http.post("http://101.78.175.101:6780/getStatus", JSON.stringify(body), {headers:this.headers})
    .map(res => res.json());
   }

    getDetail(event_id) {
        let body = {
            event_id: event_id
        }
        return this.http.post("http://101.78.175.101:6780/getDetail", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

    joinEvent(user_id, event_id) {
        let body = {
            user_id: user_id,
            event_id: event_id
        }
        return this.http.post("http://101.78.175.101:6780/joinEvent", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

    leaveEvent(user_id, event_id) {
        let body = {
            user_id: user_id,
            event_id: event_id
        }
        return this.http.post("http://101.78.175.101:6780/leaveEvent", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

    eventUser(event_id) {
        let body = {
            event_id: event_id
        }
        return this.http.post("http://101.78.175.101:6780/eventUser", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }
}