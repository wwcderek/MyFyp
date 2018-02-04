import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class DiscountService {
    http: any;
    headers: any;
    public navCtrl: Nav;
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }


    getDiscount(user_id) {
        let body = {
            user_id: user_id
        };
        return this.http.post("http://101.78.175.101:6780/getDiscount", JSON.stringify(body), {headers:this.headers})
            .map(res => res.json());
    }



}