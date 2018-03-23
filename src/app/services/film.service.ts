import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GeneralService } from "../../app/services/general.service";
import 'rxjs/Rx';


@Injectable()
export class FilmService {
    http: any;
    headers: any;
    public navCtrl: Nav;
    constructor(http: Http,  public generalService: GeneralService) {
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

    writeReview(user_id, film_id, rating, title, review) {
        let body = {
            user_id: user_id,
            film_id: film_id,
            rating: rating,
            title: title,
            review: review
        };
        return this.http.post("http://101.78.175.101:6780/review", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

    getReview(film_id) {
        let body = {
            film_id: film_id,
        };
         return this.http.post("http://101.78.175.101:6780/popularReview", JSON.stringify(body), {headers:this.headers})
         .map(res => res.json());
    }

    latestReview(film_id) {
        let body = {
            film_id: film_id,
        };
         return this.http.post("http://101.78.175.101:6780/latestReview", JSON.stringify(body), {headers:this.headers})
         .map(res => res.json());
    }

    like(review_id, user_id) {
        let body = {
            review_id: review_id,
            user_id: user_id
        };
        return this.http.post("http://101.78.175.101:6780/like", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

    dislike(review_id, user_id) {
        let body = {
            review_id: review_id,
            user_id: user_id
        };
       return this.http.post("http://101.78.175.101:6780/dislike", JSON.stringify(body), {headers:this.headers})
        .map(res => res.json());
    }

    getChart() {
        return this.http.get("http://101.78.175.101:6780/getChart")
        .map(res => res.json());
    }

}