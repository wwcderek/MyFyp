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


    getDiscount() {
        return this.http.get("http://101.78.175.101:6780/getCode?user_id=")
            .map(res => res.json());
    }



}