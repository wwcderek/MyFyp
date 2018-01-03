import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class FilmService {
    http: any;
    headers: any;
    public navCtrl: Nav;
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getFilm(category) {
        return this.http.get("http://101.78.175.101:6780/showFilm?category=" + category)
            .map(res => res.json());
    }

    mostPopular() {
        return this.http.get("http://101.78.175.101:6780/mostPopular")
        .map(res => res.json());
    }

    specificFilms(category) {
        return this.http.get("http://101.78.175.101:6780/specificFilms?category=" + category)
        .map(res => res.json());
    }

    search(keyword) {
        let body = {
            keyword: keyword
        };
        return this.http.post("http://101.78.175.101:6780/search", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

}