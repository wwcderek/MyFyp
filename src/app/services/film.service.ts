import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class FilmService {
    http: any;
    public navCtrl: Nav;
    constructor(http: Http) {
        this.http = http;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
    }

    getFilm(category) {
        return this.http.get("http://101.78.175.101:6780/showFilm?category=" + category)
            .map(res => res.json());
    }


}