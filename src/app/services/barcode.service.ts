import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class BarcodeService {
    http: any;
    constructor(http: Http, public navCtrl: NavController) {
        this.http = http;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
    }

    createBarcode(data, id) {
        return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/barcode.php?action=create&data="+ data + "&id=" + id);
    }

    showBarcode(data) {
        return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/barcode.php?action=getCode&data="+ data)
        .map(res => res.json());
    }

    getBarcode(id) {
        console.log("hey there");
        return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/barcode.php?action=getOneCode&id="+ id)
            .map(res => res.json());
    }

}