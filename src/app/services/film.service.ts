import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class FilmService {
    http: any;
    constructor(http: Http, public navCtrl: NavController) {
        this.http = http;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
    }

    getFilm(category) {
        return this.http.get("http://localhost:8100/ionic3_project/ComeAndWatch/src/php/film.php?action=getFilm&category=" + category)
            .map(res => res.json());
    }


}