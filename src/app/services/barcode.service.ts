import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class BarcodeService {
    http: any;
    headers: any;
    public navCtrl: Nav;
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    createCode(data, user_id) {
        let body = {
            data: data,
            user_id: user_id
        };
        return this.http.post("http://101.78.175.101:6780/createCode", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

    showCode(data) {
        return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/barcode.php?action=getCode&data="+ data)
        .map(res => res.json());
    }

    getBarcode(id) {
        console.log("hey there");
        return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/barcode.php?action=getOneCode&id="+ id)
            .map(res => res.json());
    }

    scanBarcode() {

    }

}